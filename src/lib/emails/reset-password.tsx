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
    resetLink: string;
}

export const ResetPasswordTemplate = ({
                                          userFirstname, resetLink
                                      }: VerifyEmailTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            Reset your password
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
                <Text style={paragraph}>Hi {userFirstname},</Text>
                <Text style={paragraph}>
                    You have requested to reset your password. Please click the button below to reset it.
                    If you did not request this, please ignore this email.
                </Text>
                <Section style={btnContainer}>
                    <Button style={button} href={resetLink}>
                        Reset Password
                    </Button>
                </Section>
                <Hr style={hr}/>
                <Text style={footer}>
                    Copyright © EurekaHACKS, All rights reserved.
                </Text>
            </Container>
        </Body>
    </Html>
);

ResetPasswordTemplate.PreviewProps = {
    userFirstname: "John",
    resetLink: "https://example.com",
} as VerifyEmailTemplateProps;

export default ResetPasswordTemplate;

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
