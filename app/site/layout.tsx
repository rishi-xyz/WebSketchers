import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

type MarketingPageLayoutProps = {
  children: React.ReactNode;
};

const MarketingPageLayout = ({ children }: MarketingPageLayoutProps) => {
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

export default MarketingPageLayout;
