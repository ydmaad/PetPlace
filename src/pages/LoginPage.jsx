import { useNavigate } from "react-router-dom";
import supabase, { SupabaseProviders } from "../lib/Supabase.js";

export default function LoginPage({ signIn, setSignIn, updateSignIn }) {
  const navigate = useNavigate();

  const handleNavigateMainPage = () => {
    navigate("/");
  };
  // gogo
  return (
    <>
      <div className="hero min-h-screen bg-base-200 flex flex-col justify-center">
        <div
          className="btn btn-ghost text-5xl mb-10"
          onClick={handleNavigateMainPage}
        >
          Pet Place
        </div>
        <div className="card w-96 shrink-0 shadow-2xl bg-base-100 p-10">
          <div className="text-2xl font-semibold w-full text-center">
            로그인
          </div>
          <br />
          {signIn ? (
            <button
              type="button"
              onClick={async () => {
                await supabase.signOut();
                await updateSignIn();
              }}
              className="btn btn-primary"
            >
              로그아웃
            </button>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              {Object.keys(SupabaseProviders).map((provider, index) => (
                <button
                  type="button"
                  onClick={async () => {
                    await supabase.signIn(provider);
                    await updateSignIn();
                  }}
                  className="btn h-9 min-h-9 btn-primary m-1 w-full rounded-3xl"
                  key={index}
                >
                  {provider}로 로그인
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
