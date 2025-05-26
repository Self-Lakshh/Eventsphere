import React from 'react';
import ContactForm from '../../components/visitors/ContactForm';

function ContactUs() {
    return (
        <>
            <div>
                <h1 style={{ textAlign: 'center', margin: '12px', fontWeight: 'bold' }}>
                    Contact Us
                </h1>
                <ContactForm />
            </div>
        </>
    );
}

export default ContactUs;