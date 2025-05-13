
import TravelDestinations from '../models/travelDestinations.js';
import { TravelDestinationsOptions, TravelDestinationsFeatures } from './travelDestinations.js';
import { componentLoader, Components } from './componentLoader.js';

export const AdminJSOptions = {
    componentLoader,
    resources: [
        {
            resource: TravelDestinations,
            options: TravelDestinationsOptions,
            features: TravelDestinationsFeatures(componentLoader),
        }
    ],
    dashboard: {
        handler: async () => ({ someData: 'example' }),
        component: Components.Dashboard,
    },
    branding: {
        companyName: 'NAT',
        withMadeWithLove: false,
        logo: '/public/logo.png'
    },
};