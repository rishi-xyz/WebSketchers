import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

type PlatformLayoutProps = {
  children: React.ReactNode;
};

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
