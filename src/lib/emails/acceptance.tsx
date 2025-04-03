import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ApplicationsOpenTemplateProps {
    firstName: string;
}

export const AcceptanceEmailTemplate = ({firstName}: ApplicationsOpenTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Congratulations 🎉, See You At EurekaHACKS 2025!
        </Preview>
        <Body style={main}>
            <Container style={container}>
                <Img
                    src={`https://eurekahacks.ca/logo-small.png`}
                    width="50"
                    height="50"
                    alt="EurekaHACKS logo"
                    style={logo}
                />
                <Text style={paragraph}>Hey {firstName}!</Text>
                <Text style={paragraph}>
                    We’re excited to have you as a hacker for EurekaHACKS 2025, our third hackathon iteration! (You are
                    one step closer to the Bambu). Join us from 8:00 AM to 9:30 PM on April 5th 2025 at 1455 Glen
                    Abbey Gate, Oakville to take part in a memorable day filled with fun workshops, exciting activities
                    and free food!
                </Text>
                <Text style={paragraph}>
                    Here’s a sneak peek into this years event:
                    <br/>
                    🌟 $11,000+ prize pool including 4 Bambu Lab A1 minis
                    <br/>
                    🍎 Free lunch and dinner for all hackers!
                    <br/>
                    🛠 Take part in fun workshops!
                    <br/>
                    <br/>
                    Date: Saturday April 5th
                    <br/>
                    Time: 8:00 AM - 9:30 PM
                    <br/>
                    Venue address: 1455 Glen Abbey Gate, Oakville
                </Text>
                <Text style={paragraph}>
                    <strong>
                        Please RSVP to confirm your spot at EurekaHACKS 2025 if you have not already! We’ll be sending
                        you more details about the event
                        in the following days, so stay tuned!
                    </strong>
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={"https://eurekahacks.ca/dashboard/"}>
                        RSVP Now
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Can't wait to see what you'll create!
                    <br/>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={hr}/>
                <Text style={footer}>
                    Copyright © EurekaHACKS 2025, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

AcceptanceEmailTemplate.PreviewProps = {
    firstName: "John",
} as ApplicationsOpenTemplateProps;

export default AcceptanceEmailTemplate;

const main = {
    backgroundColor: "#ffffff",
    fontFamily:
        "-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif",
};

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
};

const logo = {
    margin: "0 auto",
};

const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
};

const highlightBox = {
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    padding: "20px",
    margin: "20px 0",
};

const highlightText = {
    fontSize: "16px",
    lineHeight: "26px",
    margin: "0",
};

const btnContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#6d46e1",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "16px 24px",
    cursor: "pointer",
    fontWeight: "500",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};