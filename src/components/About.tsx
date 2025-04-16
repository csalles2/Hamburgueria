
const About = () => {
  return (
    <section id="sobre" className="py-20 bg-gradient-to-b from-black to-smash">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=1964&auto=format&fit=crop" 
                alt="Smash Burger" 
                className="rounded-lg shadow-xl w-full object-cover h-[400px]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg"></div>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sobre a Smash House</h2>
            <div className="h-1 w-20 bg-primary mb-6"></div>
            <p className="text-gray-300 text-lg mb-6">
              A Smash House é uma hamburgueria artesanal especializada em smash burgers suculentos, 
              com ingredientes frescos, molhos autorais e batatas crocantes. 
              Tudo preparado com carinho, pra você saborear o melhor hambúrguer da cidade sem sair de casa!
            </p>
            <p className="text-gray-300 text-lg mb-6">
              Nosso delivery é rápido, seguro e funciona todos os dias. 
              Faça seu pedido diretamente pelo site.
            </p>
            <div className="mt-8">
              <a 
                href="#cardapio" 
                className="inline-flex items-center bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105"
              >
                VEJA NOSSO CARDÁPIO
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
