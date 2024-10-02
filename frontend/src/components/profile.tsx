"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Edit2, Mail, Phone, School, Calendar, LucideIcon, Github, Linkedin, Instagram, FileText } from "lucide-react";
import dynamic from 'next/dynamic';

const CursorTrailCanvas = dynamic(() => import('@/components/CursorTrailCanvas'), { ssr: false });

interface ProfileData {
    name: string;
    college: string;
    phone: string;
    email: string;
    year: string;
    branch: string;
    insta:string;
    portf:string;
    ldn:string;
    git:string;
    message:string;
    events:string[];
}

const ProfilePage = () => {
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState(true);

    const getUserData = async () => {
        try {
            const urlParams = new URLSearchParams(window.location.search);
            const gid = urlParams.get('gid');
            const res = await fetch(`${process.env.NEXT_PUBLIC_APIHOST}/viewprofile?gid=${gid}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const resData: ProfileData = await res.json();
            setProfileData(resData);
            if (res.status === 200) {
                setLoading(false);
            } else {
                console.log("Fetch Failed");
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Dummy data for initial rendering
        setProfileData({
            name: "John Doe",
            college: "ABC College",
            phone: "1234567890",
            email: "john.doe@example.com",
            year: "3rd Year",
            branch: "Computer Science",
            insta: "john.doe",
            portf: "johndoe.com",
            ldn: "john-doe",
            git: "john-doe",
            message: "unknown",
            events: [],
        });
        setLoading(false);
    }, []);

    if (!loading && (!profileData || profileData.message === 'unknown')) {
        return (<></>);
    }

    const profile = {
        name: profileData?.name ?? '',
        image: "/events/profile.jpg",
        email: profileData?.email ?? '',
        phone: profileData?.phone ?? '',
        college: profileData?.college ?? '',
        branch: profileData?.branch ?? '',
        year: profileData?.year ?? '',
        ldn: profileData?.ldn ?? '',
        git: profileData?.git ?? '',
        insta: profileData?.insta ?? '',
        portf: profileData?.portf ?? '',
        eventsRegistered: profileData?.events ?? [],
        interests: ["DSA", "Java Programming", "Machine Learning"],
        talksRegistered: profileData?.events ?? [],
        teamMembers: ["Alice Smith", "Bob Johnson", "Charlie Brown"]
    };

    if (!loading) {
        return (
            <div className="min-h-screen bg-[#1E1E1E] text-white">
                <CursorTrailCanvas className="pointer-events-none z-50 md:flex hidden fixed inset-0 h-full w-full" />
                <header className="bg-[#2A2A2A] shadow">
                    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                        <Link href="/" className="flex items-center space-x-2 text-[#b4ff39]">
                            <ArrowLeft className="h-5 w-5" />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <div className="bg-[#2A2A2A] shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <div className="sm:flex sm:items-center sm:justify-between">
                                <div className="sm:flex sm:space-x-6 items-center">
                                    <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
                                        <Image
                                            src={profile.image}
                                            alt="Profile"
                                            width={100}
                                            height={100}
                                            className="rounded-full object-cover border-2 border-[#b4ff39]"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <h1 className="text-2xl font-bold text-[#b4ff39]">{profile.name}</h1>
                                        <p className="mt-1 text-gray-300">{profile.college}</p>
                                    </div>
                                </div>
                                {/* QR Code Placeholder */}
                                <div className="flex-shrink-0 ml-auto w-24 h-24 bg-gray-800 border-2 border-[#b4ff39] rounded-lg flex items-center justify-center">
                                    <span className="text-gray-400">QR Code</span>
                                </div>
                            </div>

                            <div className="mt-6 border-t border-gray-600 pt-6">
                                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                                    <ProfileItem icon={Mail} title="Email" value={profile.email} />
                                    <ProfileItem icon={Phone} title="Phone" value={profile.phone} />
                                    <ProfileItem icon={School} title="Branch" value={profile.branch} />
                                    <ProfileItem icon={Calendar} title="Year of Study" value={profile.year} />
                                </dl>
                            </div>
                            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                <ProfileList title="Events Registered" items={profile.eventsRegistered.length ? profile.eventsRegistered : ["No events selected"]} />
                                <ProfileList title="Talks Registered" items={profile.talksRegistered.length ? profile.talksRegistered : ["No events selected"]} />
                                <ProfileList title="Interests" items={profile.interests.length ? profile.interests : ["No interests listed"]} />
                            </div>
                            <div className="mt-8 flex flex-col items-center">
                                <h2 className="text-lg font-semibold text-[#b4ff39] mb-4">Connect with Me</h2>
                                <div className="flex space-x-4">
                                    <Link href={`https://www.github.com/in/${profile.git}`} target="_blank" rel="noopener noreferrer">
                                        <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                            <Github className="h-5 w-5" />
                                            <span>GitHub</span>
                                        </Button>
                                    </Link>
                                    <Link href={`https://www.linkedin.com/in/${profile.ldn}`} target="_blank" rel="noopener noreferrer">
                                        <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                            <Linkedin className="h-5 w-5" />
                                            <span>LinkedIn</span>
                                        </Button>
                                    </Link>
                                    <Link href={`https://www.instagram.com/${profile.insta}`} target="_blank" rel="noopener noreferrer">
                                        <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                            <Instagram className="h-5 w-5" />
                                            <span>Instagram</span>
                                        </Button>
                                    </Link>
                                    <Link href={`https://${profile.portf}`} target="_blank" rel="noopener noreferrer">
                                        <Button className="flex items-center space-x-2 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-white">
                                            <FileText className="h-5 w-5" />
                                            <span>Portfolio</span>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    return null;
}

function ProfileItem({ icon: Icon, title, value }: { icon: LucideIcon; title: string; value: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5 text-[#b4ff39] mt-1" />
            <div>
                <dt className="text-sm font-medium text-gray-300">{title}</dt>
                <dd className="mt-1 text-sm font-semibold text-white">{value}</dd>
            </div>
        </div>
    );
}

function ProfileList({ title, items }: { title: string; items: string[] }) {
    return (
        <div className="bg-[#2A2A2A] p-4 rounded-lg">
            <h3 className="text-sm font-medium text-[#b4ff39]">{title}</h3>
            <ul className="mt-2 space-y-1">
                {items.map((item, index) => (
                    <li key={index} className="text-sm text-gray-300">
                        • {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProfilePage;
