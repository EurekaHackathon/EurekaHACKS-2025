import FaqDropdown from "@/components/FaqDropdown";

export default function FaqSection() {
    // TODO: Add proper FAQs instead of GPTed ones
    const faqs = [
        {
            title: "What is a hackathon?",
            description: "A hackathon is an event where participants collaborate intensively to create innovative solutions or prototypes in a short time, usually 24–48 hours. It’s focused on coding, problem-solving, and creativity, often around a specific challenge or theme."
        },
        {
            title: "Who can participate?",
            description: "EurekaHacks is open to all high school students, regardless of experience level. Whether you’re a seasoned hacker or a first-time coder, we welcome you to join us for a weekend of learning, building, and fun!"
        },
        {
            title: "What if I don’t know how to code?",
            description: "No problem! Hackathons are a great place to learn new skills, meet new people, and have fun. We’ll have workshops, mentors, and resources available to help you get started and build your project."
        },
        {
            title: "How much does it cost?",
            description: "EurekaHacks is completely free for all participants! We’ll provide everything you need to participate, including workshops, mentors, and prizes."
        },
        {
            title: "What should I bring?",
            description: "You should bring your laptop, charger, and any other tech or hardware you need to work on your project. We also recommend bringing a water bottle, snacks, and a change of clothes if you plan to stay overnight."
        },
        {
            title: "How do I register?",
            description: "Registration for EurekaHacks will open soon! Check our website and social media for updates on registration dates and deadlines"
        }
    ];

    return (
        <div className="text-gray-50 pt-32" id="faq">
            <div className="flex justify-center pt-4">
                <h1 className="xl:w-3/5 md:w-[80%] w-[90%] lg:text-5xl md:text-4xl text-3xl font-semibold ml-4">Frequently
                    Asked Questions</h1>
            </div>
            <div className="flex justify-center pt-12">
                <div className="xl:w-3/5 md:w-[80%] w-[90%]">
                    <div className="grid lg:grid-cols-2 lg:gap-x-24 lg:gap-y-8 md:gap-y-6 gap-y-4">
                        {faqs.map((faq, index) => {
                            return <FaqDropdown key={index} title={faq.title} description={faq.description} />;
                        })}
                    </div>
                </div>
            </div>
            <h1 className="text-center py-32 text-2xl">insert some art here or smth</h1>
        </div>
    );
}