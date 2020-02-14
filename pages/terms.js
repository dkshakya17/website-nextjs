import Page from '../components/PageLayout'
import withLayout from '../components/MyLayout'
import Container from 'react-bootstrap/Container'
import Head from 'next/head';
import {NextSeo} from 'next-seo';


const MetaInfo = () => {
  const meta = {
    title:'Terms & Conditions | UniAcco',
    description:'Please read the terms and conditions before using the website uniacco.com.',
    keywords:'uniacco terms, terms and conditions uniacco',
    url: 'https://uniacco.com/terms-and-conditions',
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
  <div>
      <p>TERMS AND CONDITIONS OF WEBSITE USE</p>

      <p>These terms of use (together with the documents referred to in them)
      tell you the terms of use on which you may use or access
      www.uniacco.com, a subdomain or any such related websites and/or
      mobile application for such website (our “Sites”) whether as a guest
      or registered user. Use of our Sites includes accessing, browsing or
      registering for an account. If you log in to our Sites through a third
      party such as Facebook, Google etc. then you will be bound by these
      terms when you reach our Site.Please read and accept these terms of
      use carefully before using our Sites, as these will apply to your use
      of our Sites. If you do not agree to these terms of use, you must not
      use our Sites.</p>

      <h3>Other Applicable Terms</h3>

      <p>These terms of use refer to the following
      additional terms, which also apply to your use of our Sites:</p>

      <h4>Information about us</h4>

      <p>Our Site is operated by Adventum Student Living Pvt Ltd. With the
      registered office at A-2403, Adventum, Marathon Futurex, Lower Parel,
      Mumbai, Maharashtra 400013.</p>

      <h4>Accessing our Sites</h4>

      <p>We do not guarantee that our Sites, or any
      content on them, will always be available or be uninterrupted. Access
      to our Sites is permitted on a temporary basis. We may suspend,
      withdraw, discontinue or change all or any part of our Sites without
      notice. We will not be liable to you if for any reason our Sites are
      unavailable at any time or for any period. You are responsible for
      making all arrangements necessary for you to have access to our
      Sites. You are also responsible for ensuring that any persons with
      access to our Sites through your internet connection are aware of
      these terms of use and the other applicable terms and conditions
      listed above, and that they comply with them.</p>

      <h4>Your account and password</h4>

      <p>In order to register for an account on our Sites you must be aged 18
      or over at the point of registration or be 13 or older and have your
      parent or guardian’s consent to register for an account on our
      Sites. You must (or your parent or guardian acting on your behalf)
      have the power to enter a binding contract with us and not be barred
      from doing so under any applicable laws.If you choose, or you are
      provided with, any user identification code, password or any other
      piece of information as part of our security procedures to set up an
      account, you must treat such information as confidential. You must not
      disclose it to any third party.We have the right to disable any user
      identification code or password, whether chosen by you or allocated by
      us, at any time, if in our reasonable opinion you have failed to
      comply with applicable law or any of the provisions of these terms of
      use and/or if we believe that your account is being used in an
      unauthorised or fraudulent manner.If you know or suspect that anyone
      other than you knows your user identification code or password you
      must promptly notify us at contact@uniacco.com. Following such
      notification you may be required to set up a new account with a new
      identification code and/or password.</p>

      <h4>Agreements between Users of Our Sites</h4>

      <p>Our Sites allow property owners and managers to advertise their
      properties (each, an “Advertiser”) to potential student tenants (each,
      a “Student”).You may use the Sites as a guest user or a registered
      user. Once you have discovered a property that best suits your needs,
      you can make an enquiry and complete the booking request form. The
      booking request form includes your name, email address, phone number
      and information concerning the length of stay. No payment details are
      required at this stage and there is no commitment to rent a room. Your
      allocated booking consultant will then contact you to confirm and
      discuss the accommodation type that you require. Contact may be made
      via email, call, whatsapp. We do not own or manage, nor do we contract
      for, any rental property listed on our Sites. We will not be a party
      to any agreement between an Advertiser and a Student. The terms of any
      agreement entered into between an Advertiser and a Student may vary
      from Advertiser to Advertiser. It is your responsibility to review and
      agree to an Advertiser’s specific terms including the Advertiser’s
      terms relating to payments and cancellations where payment is made via
      our Sites. All aspects of a transaction between a Student and an
      Advertiser, including (but not limited to) the quality, condition,
      safety or legality of the properties advertised and the ability of a
      user to enter into a transaction are solely the responsibility of each
      user. This includes the terms of any security deposit, which are set
      by the Advertiser. We do not represent, or negotiate, or carry out
      research on the part of or act on behalf of either Advertisers or
      Students.We do not accept any responsibility for the confirmation of a
      Student and/or Advertiser’s identity.  Where a third party (for
      example an education or travel agent) acts on a Student’s behalf, it
      is the Student’s responsibility to ensure the accuracy of the
      information provided by the third party. We encourage users to take
      all such steps as necessary to communicate directly with a
      Student/Advertiser (as applicable) to assure yourself of the other
      person’s identity, details of the property and any tenancy
      agreement.By providing your contact information on our platform, you
      agree to allow uniacco.com to contact you via email/call/sms for
      assistance and also send you marketing/promotional content.</p>

      <h4>Prices</h4>

      <p>The prices of properties displayed on the Sites are liable to change
      at any time. Despite our best efforts, some of the prices listed on
      the Sites may be incorrect. We expressly reserve the right to correct
      any pricing errors on our Sites and/or on potential bookings which
      have not yet been completed.We display the prices that Advertisers
      provide to us from time to time. We are not responsible or liable for
      the accuracy of the prices displayed, to the maximum extent permitted
      by applicable law. Due to the international nature of our Sites, the
      currency of the prices shown may vary depending on your
      location. Currency rates given on the Sites are based on various
      publicly available sources and should be used as guidelines
      only. Rates are not verified as accurate and actual prices may vary
      from those shown on the Sites.From time to time, third parties may
      list promotions, special offers or other forms of coupon on our Sites
      (“Coupons”). Coupons will contain terms and conditions that will apply
      in addition to these Terms, and will be void if you attempt to redeem
      the Coupon in violation of either these Terms or the terms of the
      Coupon. Unless expressly stated on the Coupon, it may not be used in
      combination with other promotions or discounts. Coupons are only
      redeemable during the promotional period specified in the Coupon,
      subject to availability. These Coupons will be non-transferable and
      have no alternative cash value.</p>

      <h4>Payments</h4>

      <p>In some circumstances, you can make payments to Advertisers via our
      Sites using payment provider such as Stripe. You can find out more
      about Stripe <a href="https://stripe.com/" target="_blank">here</a>.
      In such circumstances, it remains your
      responsibility to make yourself aware of the Advertiser’s booking and
      cancellation policies. Any deposit paid to an Advertiser via our Sites
      is held by the Advertiser not by uniacco.com. At the end of a tenancy
      agreement, you must contact the Advertiser to obtain the return of
      your deposit.</p>

      <h4>Changes and cancellation</h4>

      <p>Any tenancy agreement entered into will be between a Student and an
      Advertiser.  It is a Student’s responsibility to make themselves aware
      of the Advertiser’s cancellation policy at the time of booking.</p>

      <h4>Intellectual property rights</h4>

      <p>We are the owner or the licensee of all intellectual property rights
      in our Sites, and in the material published on it. Those works are
      protected by copyright laws and treaties (and/or similar intellectual
      property laws, as relevant) around the world. All such rights are
      reserved.</p>

      <h4>Linking to our Sites</h4>

      <p>You may link to our home pages, provided you do so in a way that is
      fair and legal and does not damage our reputation or take advantage of
      it. You must not establish a link in such a way as to suggest any form
      of association, approval or endorsement on our part where none
      exists. You must not establish a link to our Sites in any website that
      is not owned by you.Our Sites must not be framed on any other site,
      nor may you create a link to any part of our Sites other than the home
      pages.We reserve the right to withdraw linking permission without
      notice.If you wish to make any use of content on our Sites other than
      that set out above, please contact contact@uniacco.com.</p>

      <h4>Third party links and resources on our Sites</h4>

      <p>Where our Sites contain links to other sites and resources provided by
      third parties, these links are provided for your information only. Any
      maps provided on our Sites that are provided by Google are subject to
      the current terms and conditions published by Google available
      at: <a href="https://www.google.com/intl/en/help/terms_maps.html">http://www.google.com/intl/en/help/terms_maps.html</a> and
       <a href="https://developers.google.com/maps/terms">https://developers.google.com/maps/terms</a>. We have no control over the
      contents of those sites or resources.</p>

      <h4>Changes to the terms</h4>

      <p>We may revise these terms at any time by amending this page. We will
      use appropriate means, such as relevant announcements on our homepage,
      to inform you on such amendments. If you do not agree with the
      changes, you must stop using the Sites.</p>

      <h4>Applicable Law</h4>

      <p>If you are a consumer, please note that these terms of use, their
      subject matter and their formation, are governed by English law and
      you and we both agree that the courts of England and Wales will have
      non-exclusive jurisdiction, however nothing in this clause 12 shall
      prevent you from being able to bring a claim in the courts of your
      country of residence under the applicable laws of your country of
      residence in situations where your right to do so is mandatory under
      applicable local law.</p>

  </div>
  </Container>


const title = {blue: 'terms &', orange: 'conditions'}

const pageWithLayout = withLayout(Page(title, content));
pageWithLayout.getInitialProps = async ({ req, query }) => {
  return {props: {}}
}

export default pageWithLayout;
