import { ArrowRight, IconCalendar, IconSparkles } from "@/components/Icons.tsx";

export function MentorshipCard() {
  return (
    <div class="w-full p-6 bg-gradient-to-br from-lime-50 to-white border border-lime-200 rounded-xl shadow-sm">
      <div class="flex flex-col items-start gap-6">
        {/* Left side with icon */}
        <div class="flex-shrink-0 w-12 h-12 rounded-full bg-lime-100 flex items-center justify-center">
          <IconSparkles className="w-6 h-6 text-lime-600" />
        </div>

        {/* Content */}
        <div class="flex-1">
          <h3 class="text-xl font-semibold text-gray-900 mb-1">
            Acelere seu aprendizado com mentoria particular
          </h3>
          <p class="text-gray-600 mb-4">
            Agende uma sessão particular para resolver suas dúvidas, receber
            feedback em seus projetos e acelerar sua evolução no UI Design.
          </p>

          {/* Features */}
          <div class="grid grid-cols-1 gap-3 mb-4">
            <div class="flex items-center gap-2 text-gray-700">
              <IconCalendar />
              <span class="text-sm">Sessões de 1 hora</span>
            </div>
            <div class="flex items-center gap-2 text-gray-700">
              <IconSparkles className="w-4 h-4" />
              <span class="text-sm">Feedback personalizado</span>
            </div>
          </div>

          {/* CTA Button */}
          <a
            href="https://cal.com/sammarxz/mentoria-1h"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 bg-lime-200 
            text-lime-800 hover:bg-lime-300 border border-black/10 
            font-medium rounded-lg transition-colors duration-200 group
            w-full justify-center"
          >
            Agendar mentoria
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
