export const navVariants = {
    initial: {
        y: -100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5
        }
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5
        }
    }
};

export const modalVariants = {
    hidden: {
        opacity: 0,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
            duration: 0.2,
            when: "afterChildren"
        }
    },
    visible: {
        opacity: 1,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: {
            duration: 0.3,
            when: "beforeChildren"
        }
    }
};

export const contentVariants = {
    hidden: {
        y: -60,
        scale: 0.95,
        opacity: 0,
        transition: {
            type: "spring",
            duration: 0.4
        }
    },
    visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.4
        }
    }
};
