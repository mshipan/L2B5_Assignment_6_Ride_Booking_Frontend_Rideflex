import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";

type ContactFormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const Contact = () => {
  const form = useForm({
    // resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    console.log("Form submitted:", data);
    console.log(data);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 pb-12 space-y-12">
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary px-6 py-16 text-center">
        <h1 className="text-2xl md:text-5xl font-bold mb-4">
          Get in Touch With Us
        </h1>
        <p className="text-md md:text-xl max-w-2xl mx-auto mb-6">
          Have questions, feedback, or ideas? Fill out the form below and we’ll
          get back to you as soon as possible.
        </p>
        <Button
          variant="outline"
          className="px-6 py-3 bg-white text-primary font-semibold rounded-full shadow hover:bg-gray-100 transition"
          onClick={() =>
            document
              .getElementById("contact-form")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Contact Us
        </Button>
      </section>
      <h1 className="text-4xl font-bold text-center">Contact Us</h1>
      <p className="text-center text-muted-foreground">
        Have questions? Reach out and we’ll get back to you soon.
      </p>

      {/* Contact Form */}
      <div className="max-w-2xl mx-auto bg-card shadow-lg rounded-2xl p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input placeholder="Subject of your message" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder="Write your message here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Form>
      </div>

      {/* Map Section (Optional) */}
      <div className="w-full h-80 rounded-2xl overflow-hidden shadow">
        <iframe
          title="Headquarters Location"
          width="100%"
          height="100%"
          frameBorder="0"
          className="rounded-2xl"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.903139978909!2d90.3915!3d23.7509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8942c29f7c1%3A0xa0f1f3d6a6c1ed5d!2sDhaka!5e0!3m2!1sen!2sbd!4v1670000000000!5m2!1sen!2sbd"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
