export default function BusinessContract({
  onSubmit,
}: any) {
  return (
    <div className="p-5 text-white">

      <h1 className="text-xl font-bold mb-4">
        Contrat de partenariat
      </h1>

      <iframe
        src="/contracts/business-contract.pdf"
        className="w-full h-[500px] rounded-xl"
      />

      <a
        href="/contracts/business-contract.pdf"
        download
        className="block mt-4 text-amber-400"
      >
        Télécharger le contrat
      </a>

      <input
        type="file"
        accept=".pdf,image/*"
        className="mt-4"
      />

      <button
        onClick={onSubmit}
        className="w-full mt-4 bg-amber-400 text-black py-3 rounded-xl font-bold"
      >
        Envoyer le contrat signé
      </button>

    </div>
  );
}