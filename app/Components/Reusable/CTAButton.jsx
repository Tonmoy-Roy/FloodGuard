import React from 'react';
import { Button } from '../Ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CTAButton = () => {
    return (
        <div>
            <Button
                className="gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold p-2 rounded-lg"
                asChild
            >
                <Link href="/volunteer/register" className="group flex justify-center items-center">
                    Join Rescue Team
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
                <Link href="/volunteer/how-it-works">
                    Learn More
                </Link>
            </Button>
        </div>
    );
};

export default CTAButton;