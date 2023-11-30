import React from "react";
import { Link } from "react-router-dom";

export default function NavigationLinks({ links })
{
    return (
        <div className="flex flex-col gap-4 flex-1 mt-6">
            {links.map((link, index) => (
                <Link key={index} className="flex items-start text-xl px-0 py-2 text-white" to={link.to}>
                    <span className="font-medium">{link.text}</span>
                </Link>
            ))}
        </div>
    );
}