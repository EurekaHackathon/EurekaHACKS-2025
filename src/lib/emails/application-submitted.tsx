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

interface VerifyEmailTemplateProps {
    userFirstname: string;
}

export const ApplicationSubmittedTemplate = ({
                                        userFirstname
                                    }: VerifyEmailTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Thanks for applying!
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
                <Text style={paragraph}>Hey {userFirstname}!</Text>
                <Text style={paragraph}>
                    Thanks for applying to EurekaHACKS 2025! Your hacker application has been successfully submitted.
                    We will review your application and get back to you soon. If you have any questions or concerns,
                    please contact <a href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
                </Text>
                <Text style={paragraph}>
                    Best,
                    <br/>
                    The EurekaHACKS Team
                </Text>
                <Hr style={hr}/>
                <Text style={footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

ApplicationSubmittedTemplate.PreviewProps = {
    userFirstname: "John",
    verificationLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ApplicationSubmittedTemplate;

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

const btnContainer = {
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#6d46e1",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "12px",
    cursor: "pointer",
};

const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
};

const footer = {
    color: "#8898aa",
    fontSize: "12px",
};
