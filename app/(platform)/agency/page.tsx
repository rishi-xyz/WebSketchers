import AgencyDetails from "@/components/forms/agency-details";
import { getAuthUserDetails, verifyAndAcceptInvitation } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Plan } from "@prisma/client";
import { redirect } from "next/navigation";

const AgencyPage = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  //verfiy and check if the user has been invited to an agency
  const agencyId = await verifyAndAcceptInvitation();
  //get current logged in user's details
  const user = await getAuthUserDetails();
  if (agencyId) {
    if (user?.role === "SUBACCOUNT_GUEST" || user?.role === "SUBACCOUNT_USER") {
      return redirect("/subaccount");//if user is a subaccount user or guest, redirect to subaccount page
    } else if (user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") {
      //if user is an agency owner or admin, redirect to billing page if searchParams.plan is present
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split("___")[0];
        const stateAgencyId = searchParams.state.split("___")[1];
        if (!stateAgencyId) {
          return <div>Not Authorized</div>;
        }
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`
        );
      } else {
        return redirect(`/agency/${agencyId}`);
      }
    }else{
      return <div>Not Authorized</div>;
    }
  }
  const authUser = await currentUser();
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl m-3 font-bold">Create An Agency</h1>
        <AgencyDetails
          data={{companyEmail:authUser?.emailAddresses[0].emailAddress}}
        />
      </div>
    </div>
  );
};

export default AgencyPage;
