import React, { useEffect, useState } from "react";

type RotatingShadowProps = React.PropsWithChildren & {
    shadowColor: string;
    shadowBlur: number;
    shadowSpread: number;
    radius: number;
    borderRadius: number;
};

export function RotatingShadow({
    children,
    borderRadius = 0,
    shadowColor = "#000000",
    shadowBlur = 50,
    shadowSpread = -5,
    radius = 12,
}: RotatingShadowProps) {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const animate = () => {
            setRotation((prev) => (prev + 1) % 360);
            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <div
            style={{
                boxShadow: `${Math.cos((rotation * Math.PI) / 180) * radius}px 
                      ${Math.sin((rotation * Math.PI) / 180) * radius}px 
                      ${shadowBlur}px ${shadowSpread}px ${shadowColor}`,
                transition: "box-shadow 350ms linear",
                borderRadius,
            }}
        >
            {children}
        </div>
    );
}
