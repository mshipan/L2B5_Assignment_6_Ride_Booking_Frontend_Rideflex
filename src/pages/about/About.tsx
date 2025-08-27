import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import user1 from "@/assets/images/user1.jpeg";
import user2 from "@/assets/images/user2.jpg";
import user4 from "@/assets/images/user4.jpg";

import {
  Timeline,
  TimelineContent,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";

const About = () => {
  const team = [
    {
      name: "Jane Doe",
      role: "CEO & Founder",
      image: user1,
      bio: "Jane leads the vision and strategy of the company with over 10 years of experience in the industry.",
    },
    {
      name: "John Smith",
      role: "CTO",
      image: user2,
      bio: "John oversees all technical aspects and ensures our platform runs smoothly at scale.",
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      image: user4,
      bio: "Emily crafts user-centered designs and ensures a delightful product experience.",
    },
  ];

  const timeline = [
    { id: 1, year: "2021", event: "Company founded" },
    { id: 2, year: "2022", event: "Launched our first mobile app" },
    { id: 3, year: "2023", event: "Reached 100K users" },
    { id: 4, year: "2024", event: "Expanded globally" },
  ];
  return (
    <div className="flex flex-col pb-12 space-y-20">
      {/* Banner Section */}
      <section className="relative bg-gray-200 dark:bg-gray-900 text-primary py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-2xl md:text-5xl font-bold">About Us</h1>
          <p className="text-md md:text-xl leading-relaxed">
            Learn more about our mission, our team, and the journey that brought
            us here. We’re building the future of ride sharing with safety,
            innovation, and community at heart.
          </p>
        </div>
      </section>
      {/* Mission Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Our Mission
        </h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          We exist to make ride booking seamless, affordable, and accessible for
          everyone. Our goal is to connect people through safe, reliable, and
          technology-driven transport solutions.
        </p>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <Card
              key={member.name}
              className="rounded-2xl shadow-md border border-border hover:shadow-lg transition"
            >
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section>
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">
          Our Journey
        </h2>
        <div className="relative border-l border-border pl-6 space-y-10 max-w-2xl mx-auto">
          <Timeline defaultValue={3}>
            {timeline.map((item) => (
              <TimelineItem key={item.id} step={item.id}>
                <TimelineHeader>
                  <TimelineSeparator />
                  <TimelineTitle className="-mt-0.5">{item.year}</TimelineTitle>
                  <TimelineIndicator />
                </TimelineHeader>
                <TimelineContent>{item.event}</TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </section>
    </div>
  );
};

export default About;
