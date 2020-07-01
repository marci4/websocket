import { Container, injectable, multiInject } from 'inversify';
import { getLogger } from '../logger';
import KernelInterface from '../interfaces/KernelInterface';
import Service, { SERVICE } from '../interfaces/Service';
import config from '../config';
import ApplicationException from '../exceptions/ApplicationException';

/**
 * Denotes the running states of the application.
 */
enum RunningStates {
    idle,
    booting,
    running,
    terminating
}

/**
 * The Kernel acts as the starting point of the application, loading services required in order for it to run, bit like an OS.
 */
@injectable()
export default class Kernel implements KernelInterface {
    private static readonly logger = getLogger('kernel');



    /**
     * @type {RunningStates} Running state of the kernel
     */
    private state: RunningStates = RunningStates.idle;

    /**
     * Constructor.
     * @param {Container} container the IoC Container
     * @param {Service } services
     */
    public constructor(
        private readonly container: Container,
        @multiInject(SERVICE) private readonly services: Service[],
    ) {
    }

    /**
     * Execute order 66 (run the app).
     */
    public async run(): Promise<void> {
        // If already booting, stop here.
        if (this.state != RunningStates.idle) {
            return;
        }

        this.state = RunningStates.booting;

        Kernel.logger.info(`Starting! == VERSION: ${config.app.version}, ENV: ${config.app.environment} ==`);

        try {
            // @See config/app/.ts
            Kernel.logger.info('Booting services');
            await Promise.all(
                this.services.map(
                    service => service.boot?.apply(
                        service, [this.container])
                )
            );

            Kernel.logger.info('Starting services');
            await Promise.all(
                this.services.map(
                    service => service.start?.apply(
                        service, [this.container])
                )
            );

            this.state = RunningStates.running;
        } catch (e) {
            switch (e.constructor.name) {
                case 'ApplicationException': {
                    this.handleApplicationException(e);
                    break;
                }
                default: {
                    this.terminate(1);
                }
            }
        }
    }

    /**
     * Public interface to execute a termination. An ApplicationException object must be supplied, giving the correct data.
     * @param code number
     */
    public async terminate(code = 0): Promise<void> {

        // If Idle or already terminating, we don't care as we're dead anyway sonny jim! :(
        if (this.state === RunningStates.idle || this.state === RunningStates.terminating) return;

        // Set app as terminating!
        this.state = RunningStates.terminating;

        Kernel.logger.info(`TERMINATING! CODE: ${code}`);

        // Handle killing everything here
        process.exit(code);
    }

    /**
     * Executes logging and termination of the application.
     * @param err any
     * @param code number
     */
    public async terminateWithError(err: any, code = 1): Promise<void> {
        Kernel.logger.error(err.stack ?? err.message ?? err.code ?? err.toString());

        await this.terminate(code);
    }

    /**
     * Application level errors will be catched here, echoed out and displayed correctly
     * @param exception ApplicationException
     */
    private async handleApplicationException(exception: ApplicationException): Promise<void> {
        Kernel.logger.error(`MESSAGE: ${exception.message}`);
        Kernel.logger.error(`ORIGIN: ${exception.origin}`);
        Kernel.logger.error(`CODE: ${exception.code}`);

        await this.terminate(exception.code ?? 1);
    }
}
