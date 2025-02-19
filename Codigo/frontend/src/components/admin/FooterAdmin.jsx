import React from 'react'


const FooterAdmin = () => {
    return (
        <footer className="bg-white text-white py-6 mt-8">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo ou Nome */}
                <div className="mb-1 md:mb-0">
                    <h1 className="text-lg font-bold text-[#00008B]">
                        casa&condominio.bh
                    </h1>
                </div>

                {/* Links úteis */}
                <div className="flex gap-5 mb-1 md:mb-0">
                    <a
                        href="/privacy"
                        className="text-sm text-[#00008B] hover:text-[#F9BF29] transition"
                    >
                         Home
                    </a>
                    <a
                        href="/terms"
                        className="text-sm text-[#00008B] hover:text-[#F9BF29] transition"
                    >
                        Carrinho
                    </a>
                    <a
                        href="/contact"
                        className="text-sm text-[#00008B] hover:text-[#F9BF29] transition"
                    >
                        Clientes
                    </a>
                </div>

                {/* Redes Sociais */}
                <div className="flex gap-4">
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00008B] hover:text-blue-500 transition"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00008B] hover:text-blue-400 transition"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00008B] hover:text-pink-500 transition"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>

            {/* Linha separadora */}
            <div className="border-t border-[#00008B] mt-4 pt-3 text-center">
                <p className="text-sm text-gray-500">
                    &copy; 2024 Casa&Condomínio. Todos os direitos reservados.
                </p>
            </div>
        </footer>
    )
}

export default FooterAdmin
