import { signIn } from "@/auth";
import BlurImage from "@/components/blur-image";
import Logo from "@/components/layouts/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { getLocationImagesPixabay } from "@/lib/unsplash/generate-image-url";
import { placeholderBlurhash } from "@/lib/utils";

import GoogleIcon from "@/public/logo-google.svg";

export default async function SignInPage() {
  const location = ["mountain", "beach", "city", "nature"];
  const randomLocation = location[Math.floor(Math.random() * location.length)];

  const imagePixabay = await getLocationImagesPixabay(randomLocation, 5);

  const randomImage =
    imagePixabay[Math.floor(Math.random() * imagePixabay.length)];

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex flex-col gap-8 items-center justify-center py-12 h-screen relative">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute top-0 flex items-center justify-between w-full px-5 sm:px-4">
          <Logo />
          <ThemeToggle />
        </div>
        <NeonGradientCard
          borderRadius={12}
          borderSize={1}
          className="grid w-[400px] h-fit justify-center items-center gap-6"
          neonColors={{
            firstColor: "#7ece94",
            secondColor: "#d7e0d9",
          }}
        >
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Welcome back!</h1>
            <p className="text-muted-foreground text-sm">
              Sign in to access your dashboard and start planning your next
              trip.
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/dashboard" });
            }}
            className="mt-4"
          >
            <Button
              type="submit"
              variant={"secondary"}
              size={"lg"}
              className="font-medium w-full flex items-center gap-x-2"
            >
              <GoogleIcon className="w-6 h-6" />
              <span>Sign in with Google</span>
            </Button>
          </form>
        </NeonGradientCard>
      </div>
      <div className="hidden bg-muted lg:block h-screen relative">
        <BlurImage
          src={randomImage.url}
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-50 dark:grayscale"
          placeholder="blur"
          blurDataURL={placeholderBlurhash}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute bottom-0 right-0 p-4 bg-background/70 rounded-tl-xl">
          <p className="text-foreground font-medium">
            Photo from <a href="https://pixabay.com/">Pixabay</a> by{" "}
            {randomImage.photographer}
          </p>
        </div>
      </div>
    </div>
  );
}
