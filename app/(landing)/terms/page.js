import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="font-poppins flex justify-center items-center pt-20 pb-20 bg-gradient-to-tl from-logo-purple/75 via-mid-purple/40 via-65% to-transparent">
      <div className="max-w-3xl w-full bg-white p-10 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Effective as of July 26, 2024
        </p>
        <p className="text-gray-700 mb-6 leading-relaxed">
          Thank you for participating in the Kinetik Event (the "Hackathon")
          sponsored and facilitated by Kinetik ("we," "us," "our"). These Terms
          and Conditions outline how we collect, use, disclose, and protect your
          personal information in connection with your participation in the
          Hackathon.
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            1. Information We Collect
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We collect the following types of information:
          </p>
          <ul className="list-inside text-gray-700 leading-relaxed">
            <li>
              <strong>1.1 Personal Information</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  Contact Information: Name, email address, phone number, and
                  mailing address.
                </li>
                <li>
                  Professional Information: Resume, LinkedIn profile, GitHub
                  username, and other relevant professional details.
                </li>
                <li>
                  Demographic Information: Age, gender, and educational
                  background.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>1.2 Submission Information</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  Challenge Submissions: Code, documentation, designs, and other
                  materials you submit as part of your participation in the
                  Hackathon.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>1.3 Usage Information</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  Platform Usage: Information about your interaction with the
                  Kinetik Platform, including IP address, browser type, and
                  access times.
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the collected information for the following purposes:
          </p>
          <ul className="list-inside text-gray-700 leading-relaxed">
            <li>
              <strong>2.1 Facilitation of the Hackathon</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  To facilitate your participation in the Hackathon, including
                  the evaluation and selection of winners.
                </li>
                <li>
                  To communicate with you regarding the Hackathon, including
                  updates, announcements, and feedback.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>2.2 Prize Disbursement</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  To disburse prizes, internships, or other incentives to the
                  winners of the Hackathon.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>2.3 Marketing and Promotional Activities</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  To promote future hackathons and events, we may use your
                  information to send you promotional materials. You can opt out
                  of receiving such communications at any time.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>2.4 Platform Improvement</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  To analyze and improve the Kinetik Platform and our services
                  based on user feedback and usage data.
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            3. Information Sharing and Disclosure
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may share your information in the following circumstances:
          </p>
          <ul className="list-inside text-gray-700 leading-relaxed">
            <li>
              <strong>3.1 With Sponsors</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  We may share your information with the sponsors of the
                  Hackathon for prize disbursement and internship opportunities.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>3.2 With Third-Party Service Providers</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  We may share your information with third-party service
                  providers who assist us in operating the Hackathon and the
                  Kinetik Platform.
                </li>
              </ul>
            </li>
            <li className="mt-2">
              <strong>3.3 Legal Requirements</strong>:
              <ul className="list-disc list-inside pl-6">
                <li>
                  We may disclose your information if required by law or if we
                  believe such action is necessary to comply with legal
                  processes, protect our rights, or investigate fraud.
                </li>
              </ul>
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            4. Ownership and Access to Submissions
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>4.1 Ownership:</strong> Upon submission to the Kinetik
            Platform, Kinetik will own the rights and have full access to the
            code and all other materials submitted.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            5. Prize Disbursement Fee
          </h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>5.1 Kinetik's Commission:</strong> Kinetik will take 10% of
            the disbursed prize, whether it is a cash prize or a portion of the
            job salary for any employment opportunities facilitated through the
            Hackathon.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal information from unauthorized access,
            disclosure, alteration, and destruction. However, despite our
            efforts, no security measures are completely foolproof, and we
            cannot guarantee absolute security. Therefore, we shall not be
            liable for any unauthorized access, disclosure, alteration, or
            destruction of your personal information resulting from a breach of
            our security measures.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, correct, or delete your personal
            information. To exercise these rights, please contact us at the
            email address provided below.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to These Terms and Conditions
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We may update these Terms and Conditions from time to time. We will
            notify you of any significant changes by posting the new Terms and
            Conditions on the Kinetik Platform and updating the effective date.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about these Terms and
            Conditions or our data practices, please contact us at:
            <br />
            <br />
            <strong>KINETIK:</strong>
            <br />
            Address: University Avenue and Oxford St, Berkeley, CA 94720
            <br />
            Email Address: kinetikgigs@gmail.com
          </p>
        </section>
        <p className="text-gray-700 mb-8 leading-relaxed">
          By signing up to Kinetik you acknowledge that you have read,
          understood, and agreed to these Terms and Conditions.
        </p>
        <div className="text-center">
          <Link href="/signup">
            <span className="text-logo-purple/85 underline cursor-pointer">
              Go back to sign up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
