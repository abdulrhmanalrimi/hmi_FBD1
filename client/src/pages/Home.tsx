import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ScreenType = 'main' | 'machine1' | 'machine2' | 'material' | 'interlock1' | 'interlock2' | 'alarm' | 'autoCycle' | 'recipeManagement';

interface ButtonStates {
  [key: string]: boolean;
}

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('main');
  const [buttonStates, setButtonStates] = useState<ButtonStates>({});

  const handlePrevious = () => {
    const order: ScreenType[] = ['main', 'machine1', 'machine2', 'material', 'interlock1', 'interlock2', 'alarm', 'autoCycle', 'recipeManagement'];
    const idx = order.indexOf(currentScreen);
    if (idx > 0) setCurrentScreen(order[idx - 1]);
  };

  const handleNext = () => {
    const order: ScreenType[] = ['main', 'machine1', 'machine2', 'material', 'interlock1', 'interlock2', 'alarm', 'autoCycle', 'recipeManagement'];
    const idx = order.indexOf(currentScreen);
    if (idx < order.length - 1) setCurrentScreen(order[idx + 1]);
  };

  const getScreenTitle = (screen: ScreenType) => {
    const titles: Record<ScreenType, string> = {
      main: 'Main Menu',
      machine1: 'Machine Operation-1/2',
      machine2: 'Machine Operation-2/2',
      material: 'Material Charging',
      interlock1: 'Material Charging Interlock 1/2',
      interlock2: 'Material Charging Interlock 2/2',
      alarm: 'Alarm',
      autoCycle: 'Auto Cycle',
      recipeManagement: 'Recipe Management',
    };
    return titles[screen];
  };

  return (
    <div className="min-h-screen bg-gray-200 p-4 flex flex-col items-center justify-center">
      {/* HMI Screen Container */}
      <div className="w-full max-w-2xl bg-gray-100 border-4 border-gray-400 shadow-lg relative">
        {/* YEDCO Logo */}
        <div className="absolute top-3 right-3 z-10">
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663520571327/Ze2j4hmmTQgACZ92Kev9cr/YEDCO_5190fae7.jpg" alt="YEDCO" className="h-12 w-12 object-contain" />
        </div>
        
        {/* Header */}
        <div className="bg-gray-300 border-b-2 border-gray-400 px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono">
            <span>00/00/00</span>
            <span className="font-bold">Manager</span>
            <span>00:00:00</span>
          </div>
        </div>

        {/* Title */}
        <div className="bg-gray-200 border-b border-gray-400 px-4 py-2 text-center">
          <h2 className="text-lg font-bold text-gray-800">{getScreenTitle(currentScreen)}</h2>
        </div>

        {/* Content Area */}
        <div className="bg-gray-100 p-6 min-h-96">
          {currentScreen === 'main' && <MainMenuScreen onNavigate={setCurrentScreen} />}
          {currentScreen === 'machine1' && <MachineOperation1Screen buttonStates={buttonStates} setButtonStates={setButtonStates} />}
          {currentScreen === 'machine2' && <MachineOperation2Screen />}
          {currentScreen === 'material' && <MaterialChargingScreen />}
          {currentScreen === 'interlock1' && <InterlockScreen1 />}
          {currentScreen === 'interlock2' && <InterlockScreen2 />}
          {currentScreen === 'alarm' && <AlarmScreen />}
          {currentScreen === 'autoCycle' && <AutoCycleScreen onNavigate={setCurrentScreen} />}
          {currentScreen === 'recipeManagement' && <RecipeManagementScreen onNavigate={setCurrentScreen} />}
        </div>

        {/* Footer Navigation */}
        <div className="bg-gray-300 border-t-2 border-gray-400 px-4 py-3 flex items-center justify-between">
          <button onClick={handlePrevious} className="bg-gray-300 border-2 border-gray-500 px-3 py-2 text-gray-800 font-bold hover:bg-gray-200">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button className="bg-gray-300 border-2 border-gray-500 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-200">
              Alarm
            </button>
            <button className="bg-gray-300 border-2 border-gray-500 px-4 py-2 text-xs font-bold text-gray-800 hover:bg-gray-200">
              Hooter Reset
            </button>
          </div>
          <button onClick={handleNext} className="bg-gray-300 border-2 border-gray-500 px-3 py-2 text-gray-800 font-bold hover:bg-gray-200">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Footer Credits */}
        <div className="bg-gray-200 border-t border-gray-400 px-4 py-2 text-center text-xs text-gray-700">
          <div className="font-semibold">برمجة</div>
          <div>المهندس/ وائل العلماني</div>
          <div>المهندس/ عبدالرحمن الريمي</div>
        </div>
      </div>

      {/* Logo and Info */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 border-2 border-gray-800 rounded flex items-center justify-center text-xs font-bold">
            elit
          </div>
          <span className="font-bold text-gray-800">FLUID BED DRYER - 120 Kg (GMP Model)</span>
          <span className="font-bold text-gray-800">CHAMUNDA We care...</span>
        </div>
      </div>
    </div>
  );
}

interface MainMenuScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

function MainMenuScreen({ onNavigate }: MainMenuScreenProps) {
  const buttons = [
    { label: 'Welcome', screen: 'main' as ScreenType },
    { label: 'Machine Operation', screen: 'machine1' as ScreenType },
    { label: 'Password Setup', screen: 'main' as ScreenType },
    { label: 'Process Operation', screen: 'main' as ScreenType },
    { label: 'Time Setting', screen: 'main' as ScreenType },
    { label: 'Auto Cycle', screen: 'autoCycle' as ScreenType },
    { label: 'Alarm', screen: 'alarm' as ScreenType },
    { label: 'Material Charging', screen: 'material' as ScreenType },
    { label: 'Machine Light', screen: 'main' as ScreenType },
    { label: 'D/T Set', screen: 'main' as ScreenType },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {buttons.map((btn, idx) => (
        <button
          key={idx}
          onClick={() => onNavigate(btn.screen)}
          className="bg-gray-300 border-2 border-gray-500 px-4 py-3 text-gray-800 font-bold text-sm hover:bg-gray-200 active:bg-gray-200"
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}

interface MachineOp1Props {
  buttonStates: ButtonStates;
  setButtonStates: (states: ButtonStates) => void;
}

function MachineOperation1Screen({ buttonStates, setButtonStates }: MachineOp1Props) {
  const operations = [
    { label: 'Inlet Damper', action: 'Open', state: 'Close', id: 'inlet' },
    { label: 'Shaking', action: 'On', state: 'Off', id: 'shaking' },
    { label: 'Bag Lock', action: 'Lock', state: 'Unlock', id: 'bag' },
    { label: 'Filter Seal', action: 'Seal', state: 'Unseal', id: 'filter' },
    { label: 'Container Seal', action: 'Seal', state: 'Unseal', id: 'container' },
    { label: 'Purging', action: 'Open', state: 'Close', id: 'purging' },
  ];

  const toggleButton = (id: string) => {
    setButtonStates({
      ...buttonStates,
      [id]: !buttonStates[id],
    });
  };

  return (
    <div className="grid grid-cols-3 gap-2">
      {operations.map((op, idx) => (
        <div key={idx} className="border-2 border-gray-400 bg-gray-150 p-2">
          <div className="text-xs font-bold text-gray-800 text-center mb-1">{op.label}</div>
          <button 
            onClick={() => toggleButton(`${op.id}_action`)}
            className={`w-full border border-gray-500 px-2 py-1 text-xs font-bold mb-1 transition-colors ${
              buttonStates[`${op.id}_action`] ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {op.action}
          </button>
          <button 
            onClick={() => toggleButton(`${op.id}_state`)}
            className={`w-full border border-gray-500 px-2 py-1 text-xs font-bold mb-1 transition-colors ${
              buttonStates[`${op.id}_state`] ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {op.state}
          </button>
          <button className="w-full bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
            Interlock
          </button>
        </div>
      ))}
    </div>
  );
}

function MachineOperation2Screen() {
  return (
    <div className="text-center text-gray-600 py-10">
      <p className="text-sm">Machine Operation 2/2 - Additional Controls</p>
    </div>
  );
}

function MaterialChargingScreen() {
  const parameters = [
    { name: 'Blower Speed', unit: 'RPM', set: 0, actual: 0 },
    { name: 'Inlet Air Temp', unit: 'DEG C', set: 0, actual: 0 },
    { name: 'Exhaust Air Temp', unit: 'DEG C', set: 0, actual: 0 },
    { name: 'Bed Temp', unit: 'DEG C', set: 0, actual: 0 },
    { name: 'Dp Across Hepa', unit: 'MMWC', set: 0, actual: 0 },
    { name: 'Inlet Air Velocity', unit: 'M/S', set: 0, actual: 0 },
    { name: 'RH', unit: '%', set: 0, actual: 0 },
    { name: 'Dew Point', unit: '%', set: 0, actual: 0 },
  ];

  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-2 text-center">Material Charging</div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="text-left px-1 py-1 font-bold text-gray-800">Parameter</th>
            <th className="text-center px-1 py-1 font-bold text-gray-800">Set</th>
            <th className="text-center px-1 py-1 font-bold text-gray-800">Actual</th>
            <th className="text-center px-1 py-1 font-bold text-gray-800">Unit</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((param, idx) => (
            <tr key={idx} className="border-b border-gray-300">
              <td className="px-1 py-1 text-gray-800 font-semibold">{param.name}</td>
              <td className="text-center px-1 py-1 text-gray-800">{param.set}</td>
              <td className="text-center px-1 py-1 text-gray-800">{param.actual}</td>
              <td className="text-center px-1 py-1 text-gray-700 text-xs">{param.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Stop
        </button>
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Interlock
        </button>
      </div>
    </div>
  );
}

function InterlockScreen1() {
  const interlocks = [
    'Machine in Process',
    'Charging Process On',
    'Emergency Stop Released',
    'Filter Bag Sealed',
    'System Air Pressure Healthy',
    'Product Container Sealed',
    'Product Container Present',
    'Blower Motor Healthy',
    'AHU Door Closed',
  ];

  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-2 text-center">Material Charging Interlock 1/2</div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {interlocks.map((item, idx) => (
          <div key={idx} className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs text-gray-800">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Alarm
        </button>
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Hooter Reset
        </button>
      </div>
    </div>
  );
}

function InterlockScreen2() {
  const interlocks = [
    'Inlet Damper Open',
    'Inlet Damper Close',
    'Exhaust Damper Open',
    'Exhaust Damper Close',
    'Filter Bag Unsealed',
    'Inlet Damper Close',
  ];

  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-2 text-center">Material Charging Interlock 2/2</div>
      <div className="space-y-1 max-h-64 overflow-y-auto">
        {interlocks.map((item, idx) => (
          <div key={idx} className="bg-gray-200 border border-gray-400 px-2 py-1 text-xs text-gray-800">
            {item}
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Alarm
        </button>
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Hooter Reset
        </button>
      </div>
    </div>
  );
}

function AlarmScreen() {
  const alarms = [
    { time: '9:45:47 AM', date: '12/29/2009', status: 'C', text: 'Password list import successfully.' },
    { time: '9:45:47 AM', date: '12/29/2009', status: 'C', text: 'Password list import started.' },
  ];

  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-2 text-center">Alarm</div>
      <table className="w-full text-xs border border-gray-400">
        <thead>
          <tr className="bg-gray-300 border-b border-gray-400">
            <th className="px-2 py-1 font-bold text-gray-800 text-left">Time</th>
            <th className="px-2 py-1 font-bold text-gray-800 text-left">Date</th>
            <th className="px-2 py-1 font-bold text-gray-800 text-left">Status</th>
            <th className="px-2 py-1 font-bold text-gray-800 text-left">Text</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm, idx) => (
            <tr key={idx} className="border-b border-gray-300">
              <td className="px-2 py-1 text-gray-800">{alarm.time}</td>
              <td className="px-2 py-1 text-gray-800">{alarm.date}</td>
              <td className="px-2 py-1 text-gray-800">{alarm.status}</td>
              <td className="px-2 py-1 text-gray-800">{alarm.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          ACK
        </button>
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          ESC
        </button>
      </div>
    </div>
  );
}


interface AutoCycleScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

function AutoCycleScreen({ onNavigate }: AutoCycleScreenProps) {
  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-3 text-center">Auto Cycle</div>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Start
        </button>
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Halt
        </button>
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Reset
        </button>
      </div>
      <div className="bg-gray-200 border border-gray-400 p-2 mb-3 text-xs text-gray-800">
        <div className="font-bold mb-1">Steam Bypass Valve</div>
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-300 border border-gray-500 px-1 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
            Open
          </button>
          <button className="flex-1 bg-gray-300 border border-gray-500 px-1 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
            Close
          </button>
        </div>
      </div>
      <div className="bg-gray-200 border border-gray-400 p-2 mb-3 text-xs text-gray-800">
        <div>Blower Current: <span className="font-bold">0.00 Amp.</span></div>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onNavigate('recipeManagement')}
          className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Recipe
        </button>
        <button className="flex-1 bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Interlock
        </button>
      </div>
    </div>
  );
}

interface RecipeManagementScreenProps {
  onNavigate: (screen: ScreenType) => void;
}

function RecipeManagementScreen({ onNavigate }: RecipeManagementScreenProps) {
  const [recipes] = useState([
    { id: 1, name: 'Recipe 1', temp: 80, time: 120 },
    { id: 2, name: 'Recipe 2', temp: 85, time: 150 },
    { id: 3, name: 'Recipe 3', temp: 75, time: 100 },
  ]);

  return (
    <div className="border-2 border-gray-400 bg-gray-150 p-3">
      <div className="text-xs font-bold text-gray-800 mb-2 text-center">Recipe Management</div>
      <div className="bg-gray-200 border border-gray-400 p-2 mb-3 max-h-48 overflow-y-auto">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="flex items-center justify-between py-1 border-b border-gray-300 text-xs">
            <span className="text-gray-800 font-semibold">{recipe.name}</span>
            <span className="text-gray-700">T:{recipe.temp}°C | {recipe.time}s</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Recall
        </button>
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Save
        </button>
        <button className="bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
          Delete
        </button>
      </div>
      <button 
        onClick={() => onNavigate('autoCycle')}
        className="w-full bg-gray-300 border border-gray-500 px-2 py-1 text-xs font-bold text-gray-800 hover:bg-gray-200">
        Back to Auto Cycle
      </button>
    </div>
  );
}
