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

export const ApplicationsDueTemplate = ({firstName}: ApplicationsOpenTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            🚨 EurekaHACKS 2025 applications are due tomorrow! 🚨
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
                    We saw that you created a EurekaHACKS account but haven’t submitted an application yet! Applications
                    are due on Saturday, March 22, 2025 at 11:59 PM EST. Applying only takes <strong>3</strong> minutes—no short answer
                    responses required. Don't miss out on free food, $11,000 in prizes
                    (including four 3D printers), and a ton of fun!
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={"https://eurekahacks.ca/dashboard/application"}>
                        Apply Now
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

ApplicationsDueTemplate.PreviewProps = {
    firstName: "John",
} as ApplicationsOpenTemplateProps;

export default ApplicationsDueTemplate;

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