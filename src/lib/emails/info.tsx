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
import Link from "next/link";

interface InfoTemplateProps {
    firstName: string;
}

export const InfoEmailTemplate = ({firstName}: InfoTemplateProps) => (
    <Html>
        <Head/>
        <Preview>
            EurekaHACKS is tomorrow!
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
                <br/>
                <Hr style={hr}/>
                <Text style={paragraph}>Hey {firstName}!</Text>
                <Text style={paragraph}>
                    EurekaHACKS kicks off tomorrow! 🚀 We're thrilled to have you join us for an
                    action-packed day of creativity, innovation, and problem-solving alongside other passionate high
                    school students. Be sure to check out the info below so you're fully prepared to make the most of
                    your EurekaHACKS experience!
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    Registration
                </Text>
                <Text style={paragraph}>
                    Registration will be open from 7:30 AM to 8:00 AM, at the front entrance of the school. Please have
                    your <a href="https://eurekahacks.ca/dashboard/qrcode" target="_blank">QR code</a> ready to be
                    scanned. If you cannot make it to registration, please reach out to us through our <a
                    href="https://discord.gg/ApEmE7g7GB" target="_blank">Discord server</a> or email us at <a
                    href="mailto:hello@eurekahacks.ca">hello@eurekahacks.ca</a>.
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    Discord
                </Text>
                <Text style={paragraph}>
                    Discord will be our main way of communicating during the event. We will be send out important
                    updates through the event, so please make sure to join if you haven't already! You can join using
                    this link: <a href="https://discord.gg/ApEmE7g7GB" target="_blank">https://discord.gg/ApEmE7g7GB</a>.
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    EurekaHACKS packing list
                </Text>
                <Text style={paragraph}>
                    Don't know what to bring? Here’s a list of things you should consider bringing:
                    <ul style={paragraph}>
                        <li>Laptop and charger</li>
                        <li>Water bottle</li>
                        <li>Extension cord</li>
                        <li>Hardware, if you plan to use any</li>
                    </ul>
                    <Text style={paragraph}>
                        We will be providing lunch, dinner, and snacks, so no need to worry about food! 🍕
                    </Text>
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    Prizes
                </Text>
                <Text style={paragraph}>
                    Here's a sneak peek into this years prizes, worth over $11,000:
                    <ul style={paragraph}>
                        <li>Bambu Lab A1 Minis</li>
                        <li>Mechanical keyboards</li>
                        <li>$500 and $300 of ICP tokens</li>
                        <li>Jane Street cards</li>
                        <li>Escape room passes</li>
                    </ul>
                    <br/>
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    Important information
                </Text>
                <Text style={paragraph}>
                    Date: Saturday April 5th
                    <br/>
                    Time: 8:00 AM - 9:30 PM (registration opens at 7:30 AM)
                    <br/>
                    Venue address: <a
                    href="https://www.google.com/maps/place/Abbey+Park+High+School/@43.4368035,-79.7364156,20.21z/data=!4m14!1m7!3m6!1s0x882b5d865fd5349d:0x9fa1f7dc58c021e5!2sAbbey+Park+High+School!8m2!3d43.4365665!4d-79.7359694!16s%2Fm%2F02wz16b!3m5!1s0x882b5d865fd5349d:0x9fa1f7dc58c021e5!8m2!3d43.4365665!4d-79.7359694!16s%2Fm%2F02wz16b?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">
                    1455 Glen Abbey Gate, Oakville</a>
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    Hacker package
                </Text>
                <Text style={paragraph}>
                    The hacker package can be accessed <a href="https://eurekahacks.ca/hacker-package.pdf"
                                                          target="_blank">here</a>. It contains all the information you
                    need to know about the event, including the schedule, rules, and more! Please take a moment to
                    review it before the event.
                </Text>
                <br/>
                <Hr style={hr}/>
                <Text style={header}>
                    RSVP
                </Text>
                <Text style={paragraph}>
                    If you haven't already, please do so <a
                    href="https://eurekahacks.ca/dashboard" target="_blank">here</a>.
                </Text>
                <br/>
                <Hr style={hr}/>
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

InfoEmailTemplate.PreviewProps = {
    firstName: "John",
} as InfoTemplateProps;

export default InfoEmailTemplate;

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

const header = {
        fontSize: "20px",
        lineHeight: "30px",
        fontWeight: "bold",
        color: "#6d46e1",
    }
;

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