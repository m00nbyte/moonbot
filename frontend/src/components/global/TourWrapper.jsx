// modules
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { TourProvider } from '@reactour/tour';
import { shallow } from 'zustand/shallow';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { layoutPageTypes } from 'src/types';

const stateSelector = (state) => ({
    tour: state.tour,
    dispatch: state.dispatch
});

const TourWrapper = ({ handleTour, children }) => {
    const navigate = useNavigate();

    const { tour, dispatch } = useStore(stateSelector, shallow);

    const generateTourSteps = () => {
        const tourMap = [
            ['.tour-root', false],
            ['.tour-settings-api', '/settings'],
            ['.tour-coins-select', '/settings'],
            ['.tour-strategy-select', '/strategy'],
            ['.tour-strategy-info', '/strategy'],
            ['.tour-strategy-manage', '/strategy'],
            ['.tour-strategy-activate', '/strategy'],
            ['.tour-offers-open', '/offers'],
            ['.tour-offers-active', '/offers'],
            ['.tour-earnings', '/earnings'],
            ['.tour-root', '/settings']
        ];

        return tourMap.map(([selector, redirect], index) => ({
            selector,
            content: () => (
                <>
                    <span className={clsx(['-mt-1', 'font-semibold', 'text-lg'])}>
                        {(index === 0 && strings.tour.begin) ||
                            (index === tourMap.length - 1 && strings.tour.end) ||
                            strings.formatString(strings.tour.count, { step: index, total: tourMap.length - 1 })}
                    </span>
                    <span className={clsx(['pb-3', 'text-md'])}>{strings.tour.steps[index].description}</span>
                </>
            ),
            redirect
        }));
    };

    const tourSteps = generateTourSteps();

    const setTourStep = (step, redirect) => {
        if (redirect) navigate(redirect, true);
        dispatch({ type: 'tour', value: { ...tour, active: true, step } });
    };

    const continueTour = () => {
        if (tour.active && tourSteps[tour.step].redirect) {
            navigate(tourSteps[tour.step].redirect, true);
        }
    };

    const backButton = ({ currentStep, setCurrentStep, steps }) => {
        const first = currentStep === 0;
        const prevStep = currentStep - 1;
        const redirect = !first && steps[prevStep].redirect;
        const localize = strings.tour.steps[currentStep];

        return (
            <button
                className={clsx([
                    'w-full',
                    'px-2',
                    'py-1',
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'text-sm',
                    'text-stone-900',
                    'bg-stone-200',
                    'hover:bg-stone-300',
                    'transition-all',
                    currentStep === steps.length - 1 && 'hidden'
                ])}
                onClick={() => {
                    if ((currentStep === 1 && tour.manual) || first) {
                        handleTour();
                    } else {
                        setCurrentStep(prevStep, redirect);
                    }
                }}
            >
                {(first && localize.buttons.cancel) ||
                    (currentStep === 1 && tour.manual && localize.buttons.cancel) ||
                    localize.buttons.back}
            </button>
        );
    };

    const nextButton = ({ currentStep, stepsLength, setCurrentStep, steps }) => {
        const last = currentStep === stepsLength - 1;
        const nextStep = currentStep + 1;
        const redirect = !last && steps[nextStep].redirect;
        const localize = strings.tour.steps[currentStep];

        return (
            <button
                className={clsx([
                    'w-full',
                    'first:mr-2',
                    !last && 'last:ml-2',
                    'px-2',
                    'py-1',
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'text-sm',
                    'text-stone-900',
                    'bg-stone-200',
                    'hover:bg-stone-300',
                    'transition-all'
                ])}
                onClick={() => {
                    if (last) {
                        handleTour();
                    } else {
                        setCurrentStep(currentStep === steps.length - 1 ? 0 : nextStep, redirect);
                    }
                }}
            >
                {(currentStep === 0 && localize.buttons.start) || (last && localize.buttons.close) || localize.buttons.next}
            </button>
        );
    };

    return (
        <TourProvider
            className={clsx(['w-full', 'grid', 'grid-cols-1', 'gap-2', 'justify-items-stretch'])}
            steps={tourSteps}
            currentStep={tour.step}
            setCurrentStep={setTourStep}
            onClickMask={(p) => null}
            afterOpen={continueTour}
            beforeClose={handleTour}
            showBadge={false}
            showCloseButton={false}
            disableKeyboardNavigation={true}
            prevButton={backButton}
            nextButton={nextButton}
            showDots={false}
            showNavigation={true}
            disableInteraction={true}
        >
            {children}
        </TourProvider>
    );
};

TourWrapper.propTypes = layoutPageTypes;

export default TourWrapper;
