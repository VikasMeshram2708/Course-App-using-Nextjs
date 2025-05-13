import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | ClipCourse",
  description:
    "Learn how ClipCourse collects, uses, and protects your personal data with trusted providers like Razorpay and Kinde.",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <ScrollArea className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Last updated:{" "}
          {new Date().toLocaleDateString("en-US", { dateStyle: "long" })}
        </p>

        <Separator className="mb-6" />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Introduction</h2>
          <p>
            Welcome to ClipCourse. This Privacy Policy explains how we collect,
            use, and protect your personal data. By using our service, you agree
            to the terms outlined here.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Account Information:</strong> Provided by Kinde (name,
              email, ID, etc.) when you sign in.
            </li>
            <li>
              <strong>Payment Details:</strong> Handled securely by Razorpay. We
              do not store your card or UPI data.
            </li>
            <li>
              <strong>Course Usage:</strong> Which courses you view, purchase,
              or complete.
            </li>
            <li>
              <strong>Technical Info:</strong> Browser, device, and IP address
              (for analytics & security).
            </li>
          </ul>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>To authenticate users via Kinde.</li>
            <li>To process payments via Razorpay.</li>
            <li>To personalize your dashboard and course recommendations.</li>
            <li>
              To analyze and improve the platform’s performance and usability.
            </li>
          </ul>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">4. Data Sharing</h2>
          <p>We only share necessary data with trusted partners:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>Kinde:</strong> For secure login and identity management.
            </li>
            <li>
              <strong>Razorpay:</strong> For handling all payment transactions.
            </li>
            <li>
              <strong>Analytics providers:</strong> To monitor app usage
              (anonymized data only).
            </li>
          </ul>
          <p>We never sell your personal data.</p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">5. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Access your personal data.</li>
            <li>Request data deletion or correction.</li>
            <li>Withdraw consent for data processing (where applicable).</li>
          </ul>
          <p>
            Contact us at{" "}
            <a
              href="mailto:tumeshram108@gmail.com"
              className="underline underline-offset-2"
            >
              tumeshram108@gmail.com
            </a>{" "}
            to exercise your rights.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">6. Data Security</h2>
          <p>
            We use industry-standard encryption, secure API practices, and
            vetted providers (like Razorpay and Kinde) to safeguard your data.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">7. Changes to This Policy</h2>
          <p>
            We may update this policy to reflect changes in law or our service.
            We'll notify users of significant updates via email or dashboard
            notifications.
          </p>
        </section>

        <section className="space-y-4 mt-10">
          <h2 className="text-xl font-semibold">8. Contact Us</h2>
          <p>
            If you have questions about this policy or how your data is handled,
            please contact us at:
          </p>
          <p>
            <a
              href="mailto:tumeshram108@gmail.com"
              className="underline underline-offset-2"
            >
              tumeshram108@gmail.com
            </a>
          </p>
        </section>
      </ScrollArea>
      <Footer />
    </>
  );
}
