const toggleSidebar = (hamburgerRef, sidebarRef) => {
    const toggleElement = hamburgerRef.current;
    const sideElement = sidebarRef.current;

    toggleElement.classList.toggle('tham-active');
    sideElement.classList.toggle('-translate-x-full');
};

const manualSidebar = (hamburgerRef, sidebarRef, type) => {
    const toggleElement = hamburgerRef.current;
    const sideElement = sidebarRef.current;

    if (type) {
        toggleElement.classList.remove('tham-active');
        sideElement.classList.add('-translate-x-full');
    } else {
        toggleElement.classList.add('tham-active');
        sideElement.classList.remove('-translate-x-full');
    }
};

export { toggleSidebar, manualSidebar };
