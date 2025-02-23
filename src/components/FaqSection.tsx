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
            description: "You should bring your laptop, charger, and any other tech or hardware you need to work on your project. We also recommend bringing a water bottle, and snacks."
        },
        {
            title: "How do I register?",
            description: "Registration for EurekaHacks will open soon! Check our website and social media for updates on registration dates and deadlines"
        }
    ];

    const mid = Math.ceil(faqs.length / 2);
    const left = faqs.slice(0, mid);
    const right = faqs.slice(mid);

    return (

        <div className="max-w-screen-2xl px-16 m-auto pt-32 flex flex-col items-center" id="faq">
            <h1 className="text-4xl md:text-6xl font-semibold text-center text-secondary-200">
                Frequently Asked Questions
            </h1>
            <div className="flex gap-4 mt-16 flex-col md:flex-row">
                {[left, right].map((column, index) => {
                    return (
                        <div className="flex flex-col gap-4" key={index}>
                            {
                                column.map((faq, index) => {
                                    return <FaqDropdown key={index} title={faq.title} description={faq.description} />;
                                })
                            }
                        </div>
                    );
                })}
            </div>
            {/*<h1 className="text-center py-32 text-2xl">insert some art here or smth</h1>*/}
        </div>
    );
}
