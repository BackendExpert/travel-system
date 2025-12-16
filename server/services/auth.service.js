const User = require("../models/user.model");
const UserOTP = require("../models/userotp.model");
const Role = require("../models/role.model");

const crypto = require("crypto");
const bcrypt = require("bcrypt");

const sendEmail = require("../utils/email/emailTransporter");
const logUserAction = require("../utils/others/logUserAction");
const tokenCreator = require("../utils/tokens/generateToken")
const {
    CreateAccountResDTO,
    CreateLoginResDTO,
    VerifyPasswordResDTO
} = require("../dtos/auth.dto");

class AuthService {
    // OTP create
    static generateOTP(length = 8) {
        return crypto
            .randomBytes(length)
            .toString("base64")
            .replace(/[^a-zA-Z0-9]/g, "")
            .slice(0, length);
    }

    // Send OTP Email
    static async sendOTPEmail(email, otp) {
        const displayName = email.split("@")[0];

        await sendEmail({
            to: email,
            subject: "Your One-Time Login Code – Travel Management System",
            html: `
                    <div style="
                        background-color: #f1f5f9;
                        padding: 50px 16px;
                        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                    ">
                        <div style="
                            max-width: 640px;
                            margin: 0 auto;
                            background-color: #ffffff;
                            border-radius: 18px;
                            overflow: hidden;
                            box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
                        ">

                            <!-- Top Accent -->
                            <div style="
                                height: 6px;
                                background: linear-gradient(90deg, #0ea5e9, #22c55e);
                            "></div>

                            <!-- Header -->
                            <div style="padding: 34px 40px 20px;">
                                <h1 style="
                                    margin: 0;
                                    font-size: 26px;
                                    font-weight: 800;
                                    color: #0f172a;
                                    letter-spacing: -0.3px;
                                ">
                                    Travel Management System
                                </h1>

                                <p style="
                                    margin-top: 8px;
                                    font-size: 15px;
                                    color: #64748b;
                                ">
                                    Secure password-less sign-in
                                </p>
                            </div>

                            <!-- Divider -->
                            <div style="height: 1px; background-color: #e5e7eb;"></div>

                            <!-- Content -->
                            <div style="padding: 32px 40px;">
                                <p style="
                                    font-size: 16px;
                                    color: #1e293b;
                                    margin-bottom: 18px;
                                ">
                                    Hello <strong>${displayName}</strong>,
                                </p>

                                <p style="
                                    font-size: 15.5px;
                                    line-height: 1.7;
                                    color: #475569;
                                    margin-bottom: 26px;
                                ">
                                    Use the one-time login code below to access the
                                    <strong>Travel Management System</strong>.
                                    This system does not use permanent passwords.
                                </p>

                                <!-- OTP -->
                                <div style="
                                    background-color: #0f172a;
                                    color: #ffffff;
                                    font-size: 34px;
                                    font-weight: 700;
                                    letter-spacing: 8px;
                                    text-align: center;
                                    padding: 22px 16px;
                                    border-radius: 14px;
                                    margin: 30px 0;
                                ">
                                    ${otp}
                                </div>

                                <p style="
                                    font-size: 14px;
                                    color: #64748b;
                                    margin-bottom: 8px;
                                ">
                                    🔐 This code acts as your <strong>temporary login password</strong>.
                                </p>

                                <p style="
                                    font-size: 14px;
                                    color: #64748b;
                                ">
                                    ⏳ It expires automatically after <strong>10 minutes</strong>
                                    or immediately once you sign in.
                                </p>

                                <div style="
                                    margin-top: 28px;
                                    padding: 18px;
                                    background-color: #f8fafc;
                                    border-radius: 12px;
                                    font-size: 14px;
                                    color: #475569;
                                ">
                                    If you did not request this login code, you can safely ignore this email.
                                    No further action is required.
                                </div>
                            </div>

                            <!-- Footer -->
                            <div style="
                                padding: 26px 40px;
                                background-color: #f1f5f9;
                                border-top: 1px solid #e5e7eb;
                                text-align: center;
                                font-size: 13px;
                                color: #64748b;
                            ">
                                <strong style="color:#0f172a;">
                                    Travel Management System
                                </strong>
                                <div style="margin-top: 6px;">
                                    Secure • Password-less • Access-Controlled
                                </div>
                            </div>

                        </div>
                    </div>
                    `
        });

    }

    static async sendLoginNotificationEmail(email, metadata) {
        const displayName = email.split("@")[0];

        await sendEmail({
            to: email,
            subject: "Login Successful – Travel Management System",
            html: `
                <div style="
                    background-color: #f1f5f9;
                    padding: 50px 16px;
                    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                ">
                    <div style="
                        max-width: 640px;
                        margin: 0 auto;
                        background-color: #ffffff;
                        border-radius: 18px;
                        overflow: hidden;
                        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.12);
                    ">

                        <!-- Top Accent -->
                        <div style="
                            height: 6px;
                            background: linear-gradient(90deg, #22c55e, #0ea5e9);
                        "></div>

                        <!-- Header -->
                        <div style="padding: 34px 40px 20px;">
                            <h1 style="
                                margin: 0;
                                font-size: 26px;
                                font-weight: 800;
                                color: #0f172a;
                                letter-spacing: -0.3px;
                            ">
                                Login Successful
                            </h1>

                            <p style="
                                margin-top: 8px;
                                font-size: 15px;
                                color: #64748b;
                            ">
                                Travel Management System
                            </p>
                        </div>

                        <!-- Divider -->
                        <div style="height: 1px; background-color: #e5e7eb;"></div>

                        <!-- Content -->
                        <div style="padding: 32px 40px;">
                            <p style="
                                font-size: 16px;
                                color: #1e293b;
                                margin-bottom: 18px;
                            ">
                                Hello <strong>${displayName}</strong>,
                            </p>

                            <p style="
                                font-size: 15.5px;
                                line-height: 1.7;
                                color: #475569;
                                margin-bottom: 26px;
                            ">
                                You have successfully signed in to the
                                <strong>Travel Management System</strong> using secure,
                                password-less authentication.
                            </p>

                            <!-- Login Details -->
                            <div style="
                                background-color: #0f172a;
                                color: #ffffff;
                                border-radius: 14px;
                                padding: 22px;
                                margin: 28px 0;
                            ">
                                <h3 style="
                                    margin: 0 0 14px;
                                    font-size: 18px;
                                    font-weight: 600;
                                ">
                                    Login Information
                                </h3>

                                <p style="margin: 6px 0; font-size: 14px;">
                                    <strong>Time:</strong> ${metadata.timestamp}
                                </p>
                                <p style="margin: 6px 0; font-size: 14px;">
                                    <strong>Device:</strong> ${metadata.userAgent}
                                </p>
                                <p style="margin: 6px 0; font-size: 14px;">
                                    <strong>IP Address:</strong> ${metadata.ipAddress}
                                </p>
                            </div>

                            <p style="
                                font-size: 14px;
                                color: #64748b;
                            ">
                                🔐 If this login was not initiated by you, please contact the system administrator immediately.
                            </p>

                            <div style="
                                margin-top: 26px;
                                padding: 18px;
                                background-color: #f8fafc;
                                border-radius: 12px;
                                font-size: 14px;
                                color: #475569;
                            ">
                                You may now continue planning, tracking, and managing your travel activities securely.
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="
                            padding: 26px 40px;
                            background-color: #f1f5f9;
                            border-top: 1px solid #e5e7eb;
                            text-align: center;
                            font-size: 13px;
                            color: #64748b;
                        ">
                            <strong style="color:#0f172a;">
                                Travel Management System
                            </strong>
                            <div style="margin-top: 6px;">
                                Secure Access • Activity Monitoring • Travel Operations
                            </div>
                        </div>

                    </div>
                </div>
                `
        });


    }


    // create registation OR login
    static async createAuth(email, req) {
        const user = await User.findOne({ email });

        const existingOTP = await UserOTP.findOne({ email });
        if (existingOTP) {
            throw new Error("OTP already sent. Please wait 10 minutes.");
        }

        const otp = this.generateOTP();
        const hashedOTP = await bcrypt.hash(otp, 10);

        await this.sendOTPEmail(email, otp);

        await UserOTP.create({
            email,
            otp: hashedOTP
        })

        if (!user) {
            const role = await Role.findOne({ name: "user" });
            if (!role) throw new Error("Default role not found");

            const newUser = await User.create({
                email,
                role: role._id,
                isActive: true,
                isEmailVerified: false
            });

            if (req) {
                await logUserAction(
                    req,
                    "REGISTER_OTP_SENT",
                    `${email} registration OTP sent`,
                    {
                        ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                        userAgent: req.headers["user-agent"],
                        timestamp: new Date()
                    },
                    newUser._id
                );
            }

            return CreateAccountResDTO();
        }

        if (req) {
            await logUserAction(
                req,
                "LOGIN_OTP_SENT",
                `${email} login OTP sent`,
                {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date()
                },
                user._id
            );
        }

        return CreateLoginResDTO();

    }

    static async verifyPassword(email, otp, req) {

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const checkotp = await UserOTP.findOne({ email });
        if (!checkotp || !checkotp.otp) {
            await logUserAction(
                req,
                "LOGIN_ATTEMPT_FAILED",
                `${email} Login Attempt Failed, OTP not found or expired`,
                {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date()
                },
                user._id
            );

            throw new Error("OTP expired or invalid. Please request a new one.");
        }

        const isOtpValid = await bcrypt.compare(otp, checkotp.otp);
        if (!isOtpValid) {
            await logUserAction(
                req,
                "LOGIN_ATTEMPT_FAILED",
                `${email} Login Attempt Failed, Wrong OTP`,
                {
                    ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
                    userAgent: req.headers["user-agent"],
                    timestamp: new Date()
                },
                user._id
            );

            throw new Error("Invalid OTP");
        }

        const getuserrole = await Role.findById(user.role);

        const token = tokenCreator(
            {
                id: user._id,
                email: user.email,
                username: user.username,
                role: getuserrole?.name,
            },
            "1d"
        );

        const metadata = {
            ipAddress: req.headers["x-forwarded-for"] || req.socket.remoteAddress,
            userAgent: req.headers["user-agent"],
            timestamp: new Date().toLocaleString()
        };

        await logUserAction(
            req,
            "LOGIN_ATTEMPT_SUCCESS",
            `${email} Login Attempt Success`,
            metadata,
            user._id
        );

        user.lastLogin = new Date();
        await user.save();

        this.sendLoginNotificationEmail(email, metadata)
            .catch(err => console.error("Login email failed:", err));

        await UserOTP.deleteOne({ email });

        return VerifyPasswordResDTO(token);
    }

}

module.exports = AuthService