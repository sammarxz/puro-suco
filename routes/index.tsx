export default function Home() {
  return (
    <header class="relative flex items-center w-full overflow-hidden -mt-8 sm:-mt-5">
      <div class="relative items-center w-full px-5 mx-auto md:px-12 lg:px-16 max-w-7xl py-20">
        <div class="relative flex-col items-start m-auto align-middle">
          <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
            <div class="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
              <div class="max-w-xl text-center lg:text-left">
                <div class="flex flex-col items-center lg:items-start gap-5">
                  <h1 class="mt-3 font-serif text-5xl font-medium text-black sm:mt-0 sm:text-6xl max-w-[420px]">
                    Aprenda design de{"   "}
                    <span class="inline-flex py-0.5 animate-backgroundShine bg-[linear-gradient(110deg,#939393,45%,#1e293b,55%,#939393)] bg-[length:250%_100%] bg-clip-text text-transparent">
                      interfaces
                    </span>{"  "}
                    na prática
                  </h1>
                  <p class="text-lg leading-normal text-zinc-500">
                    Guia de aprendizagem para se tornar um designer de interface
                    de usuário na prática desde o básico até a criação de
                    projetos.
                  </p>
                  <button class="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-zinc-950 px-6 font-medium text-zinc-200">
                    <span>Comece a aprender desde o início</span>
                    <div class="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-5 w-5"
                      >
                        <path
                          d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                          fill="currentColor"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                        >
                        </path>
                      </svg>
                    </div>
                  </button>
                  <div class="max-w-xs flex flex-col items-center lg:items-start mt-2">
                    <p class="mb-4 text-sm text-zinc-500">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
                      aliquam, purus
                    </p>
                    <div class="flex items-center gap-11 sm:flex-row">
                      <div class="flex items-center">
                        <img
                          src="https://avatars.githubusercontent.com/u/19997815?v=4"
                          alt=""
                          class="mr-2 inline-block rounded-full object-cover h-7 w-7 sm:h-7"
                        />
                        <p class="text-sm font-bold">Sam</p>
                      </div>
                      <div class="flex items-center">
                        <p class="mr-2 text-sm font-bold">5.0</p>
                        <img
                          src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f195bcf37f880_Vector.svg"
                          alt=""
                          class="mr-1.5 inline-block w-4"
                        />
                        <img
                          src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f195bcf37f880_Vector.svg"
                          alt=""
                          class="mr-1.5 inline-block w-4"
                        />
                        <img
                          src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f195bcf37f880_Vector.svg"
                          alt=""
                          class="mr-1.5 inline-block w-4"
                        />
                        <img
                          src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f195bcf37f880_Vector.svg"
                          alt=""
                          class="mr-1.5 inline-block w-4"
                        />
                        <img
                          src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6357722e2a5f195bcf37f880_Vector.svg"
                          alt=""
                          class="mr-1.5 inline-block w-4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relative order-first block w-11/12 mx-auto -mt-5 overflow-visible sm:w-full sm:overflow-visible aspect-square md:mt-0">
              <img
                src="https://nomadkit.co/img/landing/nomadkit_hero.png"
                alt=""
                class="object-cover object-center w-full mx-auto bg-zinc-300 shadow-sm rounded-2xl lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
