import {injectable} from 'inversify';
import EventHandlerInterface from '../../interfaces/EventHandlerInterface';
import {GenericEvent} from 'ps2census/dist/client/utils/PS2Events';
import {getLogger} from '../../logger';
import config from '../../config';
import {jsonLogOutput} from '../../utils/json';
import FacilityControlEvent from './events/FacilityControlEvent';

@injectable()
export default class FacilityControlEventHandler implements EventHandlerInterface {
    private static readonly logger = getLogger('FacilityControlEventHandler');

    public handle(event: GenericEvent): boolean {
        FacilityControlEventHandler.logger.debug('Parsing message...');

        if (config.features.logging.censusEventContent) {
            FacilityControlEventHandler.logger.debug(jsonLogOutput(event), {message: 'eventData'});
        }

        try {
            const facilityControl = new FacilityControlEvent(event);
            this.storeEvent(facilityControl);
        } catch (e) {
            if (e instanceof Error) {
                FacilityControlEventHandler.logger.warn(`Error parsing FacilityControlEvent: ${e.message}\r\n${jsonLogOutput(event)}`);
            } else {
                FacilityControlEventHandler.logger.error('UNEXPECTED ERROR parsing FacilityControlEvent!');
            }

            return false;
        }

        return true;
    }

    // WIP
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    private storeEvent(facilityControlEvent: FacilityControlEvent): void {
        // TODO Store in database
    }
}
