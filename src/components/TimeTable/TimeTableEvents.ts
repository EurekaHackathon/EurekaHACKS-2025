export const timeTableData = {
    startTime: {
        hour: 8,
        minute: 0,
    },
    endTime: {
        hour: 22,
        minute: 0,
    },
    timeInc: 30,
    columnNames: [
        "Time",
        "Theatre",
        "Library",
        "Activity Room",
        "Cafeteria",
        "Misc",
    ],
    events: [
        {
            name: "Opening Ceremony",
            color: "var(--terminal-green)",
            start: {
                hour: 8,
                minute: 0,
            },
            column: 2,
            duration: 45,
            images : undefined,
            description:
                "The opening ceremony will take place in the theater, it will feature a keynote, information about the event, and a few other surprises!",
        },
        {
            name: "Scavenger Hunt Starts",
            color: "var(--terminal-red)",
            start: {
                hour: 8,
                minute: 30,
            },
            column: 6,
            duration: 30,
            description:
                "Join us for a scavenger hunt, where you explore the school to solve clues, complete challenges, and race against the clock. Gather your friends, sharpen your mind, and try to win!",
        },
        {
            name: "Team Finding",
            color: "var(--terminal-blue)",
            start: {
                hour: 8,
                minute: 45,
            },
            column: 2,
            duration: 15,
            images : undefined,
            description:
                "Allocated time where participants connect with like-minded individuals to form teams to collaborate on a project for the event. Whether you're a developer, designer, or enthusiast, this is your chance to find a team to build something incredible together.",
        },
        {
            name: "Idea Brainstorm",
            color: "var(--terminal-blue)",
            start: {
                hour: 9,
                minute: 0,
            },
            column: 2,
            duration: 30,
            images : undefined,
            description:
                "Time for brainstorming ideas with your peers, and chosen team.",
        },
        {
            name: "Git Essentials",
            color: "var(--terminal-blue)",
            start: {
                hour: 9,
                minute: 30,
            },
            column: 3,
            duration: 15,
            images : undefined,
            description:
                "New to Git? Join us for a workshop on the essentials of Git, the version control system that powers modern software development. Learn the basics, best practices, and how to collaborate effectively with your team using Git. https://tinyurl.com/eureka-git",
        },
        {
            name: "Robotics with Orbit 1360 (GYM)",
            color: "var(--terminal-blue)",
            start: {
                hour: 9,
                minute: 45,
            },
            column: 3,
            duration: 60,
            images : undefined,
            description:
                "Explore the world of robotics with Orbit 1360: An innovative team pushing the boundaries of technology. Join us for a hands-on workshop where you’ll explore robotic principles. This event has been moved to the Gym.",
        },
        {
            name: "Banner Painting",
            color: "var(--terminal-red)",
            start: {
                hour: 9,
                minute: 30,
            },
            column: 6,
            duration: 120,
            description:
                "Join us for a creative session of banner painting! Express your artistic side, collaborate with fellow participants, and create vibrant banners that will be displayed throughout the event. Let your creativity shine!",
            images : undefined,
        },
        {
            name: "Smash Bros Tournament",
            color: "var(--terminal-red)",
            start: {
                hour: 10,
                minute: 45,
            },
            column: 4,
            duration: 60,
            images : undefined,
            description:
                "Battle it out in the ultimate showdown of skill and strategy! Compete against fellow gamers in a Super Smash Bros tournament. Are you ready to claim the title of champion?",
        },
        {
            name: "Lunch",
            color: "var(--terminal-green)",
            start: {
                hour: 13,
                minute: 0,
            },
            column: 5,
            duration: 60,
            description: "Enjoy 2 slices of pizza from Domino's!",
        },
        {
            name: "Ice Cream Truck",
            color: "var(--terminal-green)",
            start: {
                hour: 13,
                minute: 0,
            },
            column: 6,
            duration: 120,
            description:
                "Cool down with some ice cream from the ice cream truck!",
        },
        {
            name: "Intro to Block Chain With Cryptochicks",
            color: "var(--terminal-blue)",
            start: {
                hour: 14,
                minute: 0,
            },
            column: 3,
            duration: 60,
            images : undefined,
            description:
                "In today’s “Intro to Blockchain” session, participants will learn all about blockchain basics— what it is, how it works, and why it matters. This session will focus on the main motivations behind blockchain including consensus, security, and decentralization as well as its practical use cases such as cryptocurrencies. Participants will also dive into the transition from Web 2.0 to Web 3.0 and see live demonstrations of blockchain in action.",
        },
        {
            name: "Reach Trivia",
            color: "var(--terminal-red)",
            start: {
                hour: 14,
                minute: 0,
            },
            column: 4,
            duration: 60,
            description:
                "Test your knowledge and quick thinking with our Reach team! Join us for a thrilling session filled with brain-teasing questions, friendly competition, and plenty of fun.",
        },
        {
            name: "Ping Pong Tournament",
            color: "var(--terminal-red)",
            start: {
                hour: 16,
                minute: 0,
            },
            column: 5,
            duration: 60,
            description:
                "Get ready to serve up some fun! Compete in our Ping Pong Tournament, where players of any level can showcase their skills, enjoy competition, and aim for the win! Note that we can only have 16 players, sign up will begin 1 hour before the event.",
        },
        {
            name: "UofT Quantum Computing Club",
            color: "var(--terminal-blue)",
            start: {
                hour: 11,
                minute: 45,
            },
            column: 3,
            duration: 60,
            images : undefined,
            description:
                "Explore the next step of computing with an introductory session on quantum mechanics and its applications in computing. Join us to understand the mysteries of qubits, quantum algorithms, and the potential of this groundbreaking technology.",
        },
        {
            name: "Mario Kart Tournament",
            color: "var(--terminal-red)",
            start: {
                hour: 12,
                minute: 0,
            },
            column: 4,
            duration: 60,
            images : undefined,
            description:
                "Rev up your engines and prepare for a racing session with your peers.  Race to victory and claim the desired first place!",
        },
        {
            name: "AI Presentation with Shashibhushan Yenkanchi",
            color: "var(--terminal-blue)",
            start: {
                hour: 16,
                minute: 0,
            },
            column: 3,
            duration: 60,
            images : undefined,
            description:
                "Delve into the world of Artificial Intelligence in our engaging lecture. Discover the principles, applications, and future trends shaping AI technology. Whether you're a novice or an expert, this session offers insights that will expand your understanding of this field.",
        },
        {
            name: "Among Us",
            color: "var(--terminal-red)",
            start: {
                hour: 15,
                minute: 15,
            },
            column: 4,
            duration: 45,
            description: "Join us for a game of Among Us!",
        },
        {
            name: "Blitz Chess Tournament",
            color: "var(--terminal-red)",
            start: {
                hour: 17,
                minute: 0,
            },
            column: 4,
            duration: 60,
            images : undefined,
            description:
                "Prepare to make your moves and outwit your opponents in our chess tournament! Whether you're a seasoned grandmaster or a beginner, join us for an hour of strategic battles and intense competition. Time controls will be 3-5 minutes with no increment.",
        },
        {
            name: "TypeRacer",
            color: "var(--terminal-red)",
            start: {
                hour: 18,
                minute: 30,
            },
            column: 4,
            duration: 30,
            description:
                "Ready, set, type! Join our Typeracer tournament and put your typing speed and accuracy to the test. Compete against fellow typists to see who comes out on top!",
        },
        {
            name: "Karaoke/Lounge",
            color: "var(--terminal-red)",
            start: {
                hour: 19,
                minute: 0,
            },
            column: 2,
            duration: 120,
            description:
                "Grab the mic and show your inner rockstar in our karaoke and lounge session. Sing your heart out to your favorite tunes, and join peers for duets. Let the music take center stage. ",
        },
        {
            name: "Hot Wings Challenge",
            color: "var(--terminal-red)",
            start: {
                hour: 20,
                minute: 30,
            },
            column: 4,
            duration: 60,
            description:
                "Dare to take on the heat in our Hot Wings Challenge! Test your tolerance with progressively spicy wings from WingsUp and see if you can handle the heat. Are you brave enough to conquer the challenge and earn your place among the spice champions?",
        },
        {
            name: "Dinner",
            color: "var(--terminal-green)",
            start: {
                hour: 20,
                minute: 0,
            },
            column: 5,
            duration: 90,
            description:
                "Dinner will include a sandwich, 2 wings, and fries, all from WingsUp!",
        },
        {
            name: "Closing Ceremony",
            color: "var(--terminal-green)",
            start: {
                hour: 21,
                minute: 30,
            },
            column: 2,
            duration: 15,
            description:
                "Don't miss the closing ceremony! We'll announce the winners of the event, share highlights, and celebrate the incredible projects created by participants. Join us for a memorable conclusion to EurekaHacks 2024.",
            images : undefined,
        },
        {
            name: "Judging",
            color: "var(--terminal-green)",
            start: {
                hour: 20,
                minute: 0,
            },
            duration: 90,
            column: 6,
            description:
                "Judges will evaluate the projects created by participants and determine the winners.",
        },
    ],
};