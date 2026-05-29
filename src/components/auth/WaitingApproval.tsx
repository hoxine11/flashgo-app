import { motion } from 'framer-motion';

interface Props {
  lang: 'ar' | 'en';
  onBackHome?: () => void;
}

export default function WaitingApproval({
  lang,
  onBackHome,
}: Props) {

  const isAr = lang === 'ar';

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6">

      {/* IMAGE */}

      <motion.div
        initial={{
          scale: 0.8,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        transition={{
          duration: 0.6,
        }}
        className="mb-10"
      >
        <img
          src="/image/wait.png"
          alt="Waiting Approval"
          className="
            w-64
            md:w-72
            h-auto
            object-contain
            drop-shadow-[0_20px_40px_rgba(251,191,36,0.20)]
          "
        />
      </motion.div>

      {/* TITLE */}

      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
        }}
        className="
          text-4xl
          font-black
          mb-4
          text-center
        "
      >
        {isAr
          ? 'شكراً لك!'
          : 'Thank You!'}
      </motion.h1>

      {/* DESCRIPTION */}

      <motion.p
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.4,
        }}
        className="
          text-center
          text-neutral-400
          max-w-sm
          leading-relaxed
          mb-10
        "
      >
        {isAr
          ? 'تم إرسال طلبك بنجاح. حسابك الآن قيد المراجعة وسنقوم بإشعارك بمجرد التحقق من الوثائق والمعلومات.'
          : 'Your account is under review. We will notify you once your account has been verified.'}
      </motion.p>

      {/* STATUS */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: 0.6,
        }}
        className="
          mb-8
          px-5
          py-2
          rounded-full
          bg-amber-400/10
          border
          border-amber-400/20
          text-amber-400
          text-sm
          font-semibold
        "
      >
        {isAr
          ? 'قيد المراجعة'
          : 'Pending Review'}
      </motion.div>

      {/* BUTTON */}

      <motion.button
        whileHover={{
          scale: 1.02,
        }}
        whileTap={{
          scale: 0.98,
        }}
        onClick={onBackHome}
        className="
          w-full
          max-w-sm
          bg-amber-400
          hover:bg-amber-500
          text-black
          font-bold
          py-4
          rounded-2xl
          transition-all
          shadow-xl
        "
      >
        {isAr
          ? 'العودة للرئيسية'
          : 'Back To Home'}
      </motion.button>

    </div>
  );
}