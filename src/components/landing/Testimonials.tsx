import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Personal Trainer",
      content:
        "O Trampa AI transformou completamente como eu gerencio meu negócio. Agora tenho clareza total dos meus números!",
      rating: 5,
    },
    {
      name: "João Santos",
      role: "Fisioterapeuta",
      content:
        "Finalmente consegui organizar minha agenda e controlar minhas finanças em um só lugar. Recomendo!",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Nutricionista",
      content:
        "A plataforma é intuitiva e me ajuda a focar no que realmente importa: cuidar dos meus pacientes.",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Profissionais que confiam no Trampa AI
          </h2>
          <p className="text-xl text-slate-600">
            Veja como estamos transformando a gestão de negócios pelo Brasil
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-slate-800">
                  {testimonial.name}
                </div>
                <div className="text-sm text-slate-500">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
