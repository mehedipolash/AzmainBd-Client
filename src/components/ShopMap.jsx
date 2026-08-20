import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { FaLocationDot, FaDiamondTurnRight } from 'react-icons/fa6';
import {
    ADDRESS_LINES,
    DIRECTIONS_URL,
    MAP_URL,
    OPENING_HOURS,
    SHOP_COORDS,
} from '../utils/business';
import { SITE_NAME } from '../utils/constants';

/* ---------------------------------------------------------------------------
   Where the showroom actually is.

   OpenStreetMap tiles through Leaflet rather than the Google Maps JavaScript
   API, for a practical reason: Google's embed requires a billing-enabled API
   key, and any key shipped to a browser is public. That means a key on this
   site could be lifted and billed to the client. OSM needs no key at all, so
   there is nothing to leak and nothing to pay for.

   Leaflet's default marker icon is loaded from a relative path that assumes a
   plain script tag, which a bundler rewrites and breaks. Drawing the pin as
   inline SVG through divIcon sidesteps that entirely, and lets the marker use
   the brand green instead of the stock blue.
--------------------------------------------------------------------------- */

const PIN_SIZE = 44;

const shopIcon = L.divIcon({
    className: 'shop-map-pin',
    html: `
        <svg width="${PIN_SIZE}" height="${PIN_SIZE}" viewBox="0 0 24 24" fill="none"
             xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${SITE_NAME}">
            <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"
                  fill="#0b7a2f" stroke="#ffffff" stroke-width="1.6"
                  stroke-linejoin="round"/>
            <circle cx="12" cy="10" r="2.6" fill="#ffffff"/>
        </svg>`,
    iconSize: [PIN_SIZE, PIN_SIZE],
    // Anchor at the pin's TIP, not its centre — otherwise the marker sits half
    // a pin north of the actual address.
    iconAnchor: [PIN_SIZE / 2, PIN_SIZE],
    popupAnchor: [0, -PIN_SIZE + 6],
});

const ShopMap = ({ height = 'h-[420px]', className = '' }) => (
    <div className={`overflow-hidden border border-base-300 bg-base-200 ${className}`}>
        <MapContainer
            center={[SHOP_COORDS.lat, SHOP_COORDS.lng]}
            zoom={16}
            // Scroll-wheel zoom off by default: a full-width map that swallows
            // the page scroll is the single most common complaint about
            // embedded maps. Dragging and the +/- buttons still work.
            scrollWheelZoom={false}
            className={`${height} w-full`}
            // Leaflet writes its own inline z-index; keeping it low stops the
            // map painting over the navbar and the floating WhatsApp button.
            style={{ zIndex: 0 }}
        >
            <TileLayer
                // Attribution is a condition of the OSM licence, not optional.
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={19}
            />

            <Marker position={[SHOP_COORDS.lat, SHOP_COORDS.lng]} icon={shopIcon}>
                <Popup>
                    <strong className="block text-[13px]">{SITE_NAME}</strong>
                    {ADDRESS_LINES.map((line) => (
                        <span key={line} className="block text-[12px]">
                            {line}
                        </span>
                    ))}
                    <a
                        href={DIRECTIONS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[12px] font-semibold underline"
                    >
                        Get directions
                    </a>
                </Popup>
            </Marker>
        </MapContainer>

        {/* The map shows where the shop is; this bar is how someone acts on it.
            Both links open in Maps, because that is where a phone can navigate
            and this embed cannot. */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-base-300 bg-base-100 px-5 py-4">
            <div className="flex items-start gap-3">
                <FaLocationDot className="mt-0.5 shrink-0 text-sm text-primary" aria-hidden="true" />
                <div>
                    <p className="text-[13px] font-medium">
                        {ADDRESS_LINES.join(', ')}
                    </p>
                    <p className="mt-0.5 text-[11px] text-base-content/50">{OPENING_HOURS}</p>
                </div>
            </div>

            <div className="flex gap-2">
                <a
                    href={DIRECTIONS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-primary-content uppercase transition-opacity hover:opacity-90"
                >
                    <FaDiamondTurnRight className="text-[12px]" aria-hidden="true" />
                    Directions
                </a>
                <a
                    href={MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border border-base-300 px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors hover:border-base-content/40"
                >
                    Open in Maps
                </a>
            </div>
        </div>
    </div>
);

export default ShopMap;
