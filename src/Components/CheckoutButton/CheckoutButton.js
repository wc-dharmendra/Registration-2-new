import Link from 'next/link';
import React, { useEffect } from 'react';

const CheckoutButton = () => {
    const appendChild = (element, content) => {
        try {
            element.appendChild(content);
        } catch (error) {
            element.appendChild(document.createTextNode(content));
        }
    };

    const createDOMElement = ({ tag, className, content, attrs }) => {
        const element = document.createElement(tag);

        if (className) {
            element.className = className;
        }

        if (content) {
            if (Array.isArray(content)) {
                content.forEach((item) => appendChild(element, item));
            } else {
                appendChild(element, content);
            }
        }

        if (attrs) {
            for (let key in attrs) {
                if (attrs.hasOwnProperty(key)) {
                    element.setAttribute(key, attrs[key]);
                }
            }
        }

        return element;
    };

    const getOrigin = (id) => {
        const element = document.getElementById(id);
        const src = element ? element.getAttribute('src') : undefined;
        return src ? new URL(src).origin : '';
    };

    const createSpinner = () => {
        const circle = createDOMElement({
            tag: 'circle',
            attrs: {
                fill: 'none',
                r: '30',
                cx: '33',
                cy: '33',
                'strokeWidth': '6',
                'strokeLinecap': 'round',
            },
        });

        const svg = createDOMElement({
            tag: 'svg',
            className: 'luma-spinner',
            attrs: {
                viewBox: '0 0 66 66',
            },
            content: [circle],
        });

        return svg;
    };

    const baseUrl = 'https://lu.ma';

    const openCheckoutModal = (eventId) => {
        const overlay = createDOMElement({ tag: 'div', className: 'luma-checkout--overlay' });
        const iframe = createDOMElement({
            tag: 'iframe',
            attrs: {
                src: `${baseUrl}/embed-checkout/${eventId}`,
                allowfullscreen: true,
                style: 'border: 0px; width: 100%; height: 100%;',
            },
        });

        iframe.onload = () => {
            overlay.classList.add('luma-iframe-loaded');
        };

        const modal = createDOMElement({ tag: 'div', className: 'luma-checkout--modal', content: iframe });
        const closeButton = createDOMElement({
            tag: 'button',
            className: 'luma-checkout--close-btn',
            content: createDOMElement({
                tag: 'img',
                attrs: {
                    src: '/static/x.svg', // Replace with the actual path to your close button image
                },
            }),
        });

        overlay.appendChild(closeButton);
        overlay.appendChild(createSpinner());
        overlay.appendChild(modal);
        overlay.appendChild(
            createDOMElement({
                tag: 'div',
                className: 'luma-checkout--by',
                content: ['Processed securely by ', createDOMElement({
                    tag: 'a',
                    content: '- Luma',
                    attrs: {
                        href: 'https://lu.ma',
                        target: '_blank',
                    },
                })],
            })
        );

        const closeOverlay = () => {
            const parent = overlay ? overlay.parentElement : undefined;
            parent && parent.removeChild(overlay);
        };

        overlay.onclick = closeOverlay;
        closeButton.onclick = closeOverlay;

        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.classList.add('luma-show');
        }, 1);
    };

    const initializeCheckout = () => {
        const zmurlButtons = document.querySelectorAll('[data-zmurl-action="checkout"]');
        const lumaButtons = document.querySelectorAll('[data-luma-action="checkout"]');

        const handleClick = (eventId) => (event) => {
            event.preventDefault();
            openCheckoutModal(eventId);
        };

        for (let i = 0; i < zmurlButtons.length; i++) {
            const button = zmurlButtons[i];
            const eventId = button.dataset.zmurlEventId;
            eventId && (button.onclick = handleClick(eventId));
        }

        for (let i = 0; i < lumaButtons.length; i++) {
            const button = lumaButtons[i];
            const eventId = button.dataset.lumaEventId;
            eventId && (button.onclick = handleClick(eventId));
        }
    };

    useEffect(() => {
        const scriptUrl = `${getOrigin('luma-checkout')}/checkout-button.css`;
        document.head.appendChild(createDOMElement({ tag: 'link', attrs: { rel: 'stylesheet', href: scriptUrl } }));
        initializeCheckout();
    }, []);

    return (<Link
        href="https://lu.ma/event/evt-7vB3A5qV4z4nY6p"
        className="luma-checkout--button btn-dark"
        data-luma-action="checkout"
        data-luma-event-id="evt-7vB3A5qV4z4nY6p"
        style={{backgroundColor:'#000',borderRadius:'50px',color:'#fff',padding:'5px 20px'}}
    >
        Register for Event
    </Link>); // This component doesn't render anything as it manipulates the DOM directly
};

export default CheckoutButton;
