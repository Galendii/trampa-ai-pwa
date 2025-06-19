import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-6">Pronto para transformar sua gestão?</h2>
        <p className="text-xl text-blue-100 mb-8">
          Junte-se a milhares de profissionais que já descobriram como ter clareza total do seu negócio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            Começar Agora
            <ArrowRight className="ml-2" size={20} />
          </Link>
          <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold transition-colors">
            Falar com Especialista
          </button>
        </div>
      </div>
    </section>
  )
}
