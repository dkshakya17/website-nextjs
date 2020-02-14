import Page from '../../components/PageLayout'
import withLayout from '../../components/MyLayout'
import Container from 'react-bootstrap/Container'

const faqs = [
    {
        question: 'Can I schedule a tour of a property before I book?', 
        answer: 'Of course! In order to arrange a viewing of a property, we need you to complete an application form on our website. As soon as we have all your details, you can contact our booking experts and they will arrange a property viewing for you.'
    },
    {
        question: 'Does UniAcco charge a fee?', 
        answer: 'We offer a free service for students.'
    },
    {
        question: 'What does the rent include? Do I need to pay extra fees?',
        answer: 'Your rent gives you the right to inhabit the property. You are provided with a bed (along with mattress), a small study table and chair in your room, and the refrigerator, microwave and stove in the kitchen. Most properties include all utilities in the rental prices as well. Please contact a booking expert for more details.Amenities: Heating, Wifi, Gym(depends), Electricity, Laundry Rooms(Sometimes Chargeable), Room cleaning(depends), Breakfast(Vita), Lounge Area, Bike Storage, Car Parking (depends)',
    },
    {
        question: 'Can I live with friends?',
        answer: "Of course! Once you've submitted an application and logged into the uniacco.com application system, navigate to the 'Preferences' section under 'My Details' and specify in 'Other Requirements' that you would like to live with friends. Please include their names on this part of your application too. Make sure your friends also add your name to their applications and we will try to process the bookings together.",
    },
    {
        question: 'How do I pay the rental fees?',
        answer: 'There are two ways to pay your rent fees: bank transfer or pay with credit/debit card.',
    },
    {
        question: 'Do I need to pay a deposit? How much is the deposit?',
        answer: 'To secure your booking with the landlord/property, you will be asked to pay a deposit (refundable at the end of your tenancy) or advance rent. Please contact our booking expert for more details.',
    },
    {
        question: 'Do I need to be a student?',
        answer: 'Yes, only full-time students can live in most properties.',
    },
    {
        question: 'How do I book a room?',
        answer: "It's easy to get started booking a room. Search through our comprehensive list of properties and request to book a room. Once you fill out the booking request form, a booking expert will contact you to begin the process of booking an accommodation. You can find out more on our 'How It Works' page.",
    },
    {
        question: 'Can I select my room?',
        answer: 'Once you submit a booking request, a booking expert will work with you and the property owner to secure a room that best fits your requirements.',
    },
    {
        question: 'What is a guarantor? Do I need one?',
        answer: 'A guarantor is a person (often a family member) that signs an agreement of being financially responsible for paying the rent in case the tenant is unable to. Many properties require a guarantor if the tenant wishes to pay the rent in installments.',
    },
    {
        question: 'Can I choose specific move-in and move-out dates?',
        answer: 'Most properties have fixed move-in and move-out dates that correspond with the academic calendar but it can be requested. Please speak with one of our booking experts for more details.',
    },
    {
        question: 'Can I apply for a summer stay or move in early?',
        answer: 'Some properties facilitate summer stays and move in early policies. Please speak with one of our booking experts for more details.',
    },
    {
        question: 'Why do some rooms show a price range?',
        answer: 'For many properties, prices for the same room layout will vary depending on the location of that room within the property. Our booking experts will help you select the specific room that best fits your needs.',
    },
    {
        question: 'Is the surrounding area of the properties safe and convenient?',
        answer: 'Our properties are usually in a great location. They are close to universities and have convenient transport links with various amenities nearby. Most properties also have security staff and CCTV in place.',
    },
    {
        question: 'Would I be able to find out details of my roommate?',
        answer: 'We can help enquire the gender of the roommate. But due to privacy concerns, landlords reserve the right to refuse the request for confidential information such as nationality and university.',
    },
    {
        question: 'Can I cancel a booking?',
        answer: 'Please ask our booking experts about the cancellation policy for your specific property.',
    },
    {
        question: 'What happens if I cancel a booking?',
        answer: 'Each property has a different cancellation policy. This policy will be stated in your rental agreement. Contact one of our booking experts for assistance.',
    },
]

const title = {blue: 'frequently', orange: 'asked questions'}
const content = () => <div>
    <Container className="mx-lg-5 px-lg-5">
        {faqs.map(faq => (
            <div>
                <h6 className="font-weight-bold">Q. {faq.question}</h6>
                <p>{faq.answer}</p>
                <hr />
            </div>
        ))}

        {/* last question has html in answer */}
        <div>
            <h6>Q. What do our different room types mean?</h6>
            <p>
                <b>Ensuite:</b> Private room with private bathroom and shared kitchen and living area.<br />
                <b>Non Ensuite:</b> Private room with shared bathroom, kitchen and living area.<br />
                <b>Studio:</b> Private room with Private bathroom as well as kitchen.<br />
                <b>Standard(6 bed & 4 bed sharing):</b> Private room with shared bathroom, kitchen and living area.<br />
                <b>Twodio:</b> Private room (in a 2 bedroom flat) with Private bathroom and a kitchen that is shared between 2 people.<br />
                <b>Threedio:</b> Private room (in a 3 bedroom flat) with Private bathroom and a kitchen that is shared between 3 people.<br />
                <b>Twin Ensuite:</b> Room (shared between 2 people) with attached bathroom where the kitchen and living area shared with more tenants.<br />
                <b>Dorms:</b> 4 or more people sharing a same dormitory.<br />
                <b>Two Bedroom and 3 bedroom Apartments:</b> Private rooms with Private/Shared bathrooms (varying from property to property) and a communal kitchen and living area.<br />
            </p>
            <p>
                There are these above room types on uniacco.com. Shared Room Enjoy the communal feeling of a shared room, which sleeps two or more in separate beds. Any additional living space and facilities are shared with other rooms. See property description for full details. Private Room No need to share in a private room, your sleep/study space is your own. Get to know your neighbours in any shared additional living space and facilities. See the property description for full details.Entire Place Relax in the privacy of a fully self-contained property. Your living space, cooking and bathing facilities are all just for you. Apply as a group with friends to rent larger places and share the cost.
            </p>
        </div>
    </Container>
    <style jsx>{`
            h6 {font-weight: bold;}
    `}</style>
</div>

const pageWithLayout = withLayout(Page(title, content));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;