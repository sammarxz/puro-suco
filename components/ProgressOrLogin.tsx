import { ProgressBar } from "@/islands/ProgressBar.tsx";

interface ProgressOrLoginProps {
  isLoggedIn: boolean;
  initialCompleted: number;
  initialTotal: number;
}

function LoginCard() {
  return (
    <div class="rounded-lg bg-gray-50 border p-4">
      <div class="flex items-start gap-4">
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-semibold text-gray-900">
            Acompanhe seu progresso
          </h3>
          <p class="text-sm text-gray-500 mt-1">
            Faça login para acompanhar seu progresso e continuar de onde parou.
          </p>
          <div class="mt-1">
            <a
              href="/signin"
              class="w-full text-center inline-flex justify-center items-center 
              px-4 py-2 border border-transparent text-sm font-medium rounded-md 
              shadow-sm text-lime-800 bg-lime-400 hover:bg-lime-500 
              focus:outline-none focus:ring-2 focus:ring-offset-2 
              focus:ring-lime-500 transition-colors duration-300"
            >
              Fazer login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProgressOrLogin(
  { isLoggedIn, initialCompleted, initialTotal }: ProgressOrLoginProps,
) {
  if (!isLoggedIn) {
    return <LoginCard />;
  }

  return (
    <ProgressBar
      initialCompleted={initialCompleted}
      initialTotal={initialTotal}
    />
  );
}
