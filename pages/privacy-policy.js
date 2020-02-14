import withLayout from '../components/MyLayout';
import Page from '../components/PageLayout'
import Container from 'react-bootstrap/Container';
import {NextSeo} from 'next-seo';

const MetaInfo = () => {
  const meta = {
    title:'Privacy Policy | UniAcco',
    description:'Our commitment to ensure privacy of users. Read about our policy to know how we collect and use data.',
    keywords:'uniacco privacy policy, privacy uniacco.com',
    url: 'https://uniacco.com/privacy-policy',
    type:'generic'
  };
  return <NextSeo
      title = {meta.title}
      description = {meta.description}
      cononical = {meta.url}
      keywords = {meta.keywords}
      openGraph= {{title: meta.title, description: meta.description, url: meta.url, type:meta.type}}
    />
}

const content = () => <Container fluid>
<MetaInfo />
<div class="mx-lg-5">
    <p>We, Adventum Student Living Private Limited Hereinafter also referred to as “UniAcco”, a company incorporated under the laws of India, having its registered office at </p>
    <p>A-4301, 43rd Floor, Lodha Bellisimo, N.M.Joshi Marg, Mahalakshmi Mumbai- 400011</p>

    <p>are the creator of this Privacy Policy. For the purpose of data protection act, Adventum Student Living Private Limited is the data controller.
To ensure better protection of your privacy, we provide this notice explaining our information collection and disclosing policies, and the choices you make and your rights about the way your information is collected and used. By visiting www.uniacco.com you are accepting and consenting to the practices described in this policy.
If You have any queries or concerns regarding this privacy policy, You should contact Our Customer Support Desk at +91 222 3021 00 / email Us at contact@uniacco.com</p>

    <p>ANY CAPITALIZED WORDS USED HENCEFORTH SHALL HAVE THE MEANING ACCORDED TO THEM UNDER THIS AGREEMENT</p>
    <h3>1. DEFINITIONS:</h3>
    <ul>
        <li> “We”, “Our”, and “Us” shall mean and refer to the creators of this privacy policy.</li>
        <li>“You”, “Your”, “Yourself” and “User” shall mean individuals who use the website.</li>
        <li>“Third Parties” refer to any application, website, company or individual apart from UniAcco.</li>
        <li> “Accommodation” refers to student rooms, individual apartments, houses etc</li>
        <li>”third party accommodation partner” refers to the our accommodation partners which includes property management groups, individual property managers, landlords etc</li>
    </ul>

    <h4>2. INFORMATION GIVEN BY YOU:</h4>

    <p>We collect the following information:
    IP address, browser type,  operating system type and platforms, Login information, URL informational, Page interactions like clicking and scrolling and phone number or email you used to call or email UniAcco, information about your visit through and from our website. We are working with advertising networks and business partners (other sources) and may receive information about you from them. </p>

    <h4>3. COOKIES:</h4>

    <p>We use data collection device known as “cookies” at our website. “Cookies” are small files situated on Your mobile/ computer/ device’s hard disk that assist us in providing customised services. A cookie helps us analyse your preferences by, for example, recording the number of times you have used the Website, and help us in tailoring our services to suit your interests. We use various analytics tools and social media engagement tool which sets a cookie on your device. Data may be collected by social media companies that may enable them showing advertisements. A “cookie” does not give Us access to your device. You may choose to disable the “cookie” feature on Your device.
    Using our online chat functionality may also mean that we collect information on your country and IP address. This information will not be used for any purpose other than to enhance the functionality of the website. </p>

    <h4>4. OUR USE OF YOUR INFORMATION:</h4>

    <p>The information given by You shall be used to contact You when necessary. After your oral or written confirmation, information will be passed on to our third party accommodation partners for booking your Accommodation. Please read third party accommodation partner’s privacy policy before giving oral or written confirmation
    We can send you details about our services or blog posts and to notify about changes in service.
    The information we collected from you can be used to improve our services, analytics, research, survey, advertisement and make suggestions to you and other users of the accommodations.</p>

    <p>We may combine information given by other sources  with information you give to us and information we collect about you. We may use information given by other sources and the combined information for the above purposes.</p>
    <h4>5. DISCLOSURE OF YOUR INFORMATION TO THIRD PARTIES:</h4>

    <p>Information will be passed on to our third party accommodation partners for booking your Accommodation after your oral or written confirmation.
    Analytics and search engine providers that assist us in the improvement and optimisation of our site.
    In case We get acquired by a company, we may share your information to that company
    If we are under a duty to disclose or share your personal data in order to comply with any legal obligation or to protect privacy and safety of UniAcco or other user we can disclose your information to various government agencies and/or third party enforcement agencies</p>

    <h4>6. ACCESSING, REVIEWING, CHANGING YOUR INFORMATION AND YOUR RIGHTS:</h4>

    <p>If you believe that any information we are holding on you is incorrect or incomplete please write to or email us as soon as possible, at contact@uniacco.com or contact us at +91 222 3021 00. We shall promptly correct any information found to be incorrect.</p>

   <p>You have a right to ask us not to use your personal information for marketing purpose. Please contact contact@uniacco.com if you wish to opt out of marketing campaigns or any other services. </p>

   <p>You have right to ask us not to process your data or to delete your data. Please send us an email at contact@uniacco.com if you want to exercise ay of the rights.</p>

    <h4>7. WHERE WE SAVE YOUR DATA </h4>

    <p>The data that we collect from you is processed by staff operating outside the EEA who work for us. Such staff maybe engaged in, among other things, the fulfilment of your accommodation booking. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this privacy policy.
    All information you provide to us is stored on secure servers.  where you have chosen a password which enables you to access certain parts of our site, you are responsible for keeping this password confidential. We ask you not to share a password with anyone.
    Unfortunately, the transmission of information via the internet is not completely secure. Although we will do our best to protect your personal data, we cannot guarantee the security of your data transmitted to our site; any transmission is at your own risk. Once we have received your information, we will use strict procedures and security features to try to prevent unauthorised access..</p>

    <h4>8. THIRD PARTY SITES:</h4>

    <p>Our Site may contain links to third party sites, including sites with which we have affiliate agreements. We have no control and hence not responsible for the privacy practices or the content of such third party websites. This Privacy Policy extends only to personal data we collect from you either via our website. We recommend that you check the privacy and security policies and procedures of each and every other website that you visit.</p>

    <h4>9. AMENDMENT:</h4>

    <p>Our Privacy Policy may change from time to time. Hence we shall post any privacy policy changes on this page.</p>

</div>
</Container>;

const title = {blue: 'privacy', orange: 'policy'}


const pageWithLayout = withLayout(Page(title, content));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
