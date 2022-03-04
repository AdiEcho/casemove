import { Fragment, useState } from 'react';
import { Listbox, Switch, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCurrencyRate,
  setCurrencyValue,
  setFastMove,
  setSourceValue,
} from 'renderer/store/actions/settings';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { classNames } from 'renderer/components/content/shared/inventoryFunctions';

const sources = [
  {
    id: 1,
    name: 'Steam Community Market',
    title: 'steam_listing',
    avatar: 'https://steamcommunity.com/favicon.ico',
  },
  {
    id: 2,
    name: 'Buff 163',
    title: 'buff163',
    avatar:
      'https://g.fp.ps.netease.com/market/file/59b156975e6027bce06e8f6ceTyFGdsj',
  },
  {
    id: 3,
    name: 'Skinport',
    title: 'skinport',
    avatar: 'https://skinport.com/static/favicon.ico',
  },
  {
    id: 4,
    name: 'Bitskins',
    title: 'bitskins',
    avatar:
      'https://i.pinimg.com/favicons/49c7e11eff082a1d5fd30978c4d013c033a371ddfcc6c54cbb4d126e.png',
  },
];
const currencyCode = [
  'AFN',
  'ALL',
  'DZD',
  'AOA',
  'ARS',
  'AMD',
  'AWG',
  'AUD',
  'AZN',
  'BSD',
  'BHD',
  'BBD',
  'BDT',
  'BYR',
  'BZD',
  'BMD',
  'BTN',
  'XBT',
  'BOB',
  'BAM',
  'BWP',
  'BRL',
  'BND',
  'BGN',
  'BIF',
  'XPF',
  'KHR ',
  'CAD',
  'CVE',
  'KYD',
  'FCFA',
  'CLP',
  'CLF',
  'CNY',
  'COP',
  'CF',
  'CDF',
  'CRC',
  'HRK',
  'CUC',
  'CZK',
  'DKK',
  'DJF',
  'DOP',
  'XCD',
  'EGP',
  'ETB',
  'FJD',
  'GMD',
  'GBP',
  'GEL',
  'GHS',
  'GTQ',
  'GNF',
  'GYD',
  'HTG',
  'HNL',
  'HKD',
  'HUF',
  'ISK',
  'INR',
  'IDR',
  'IRR',
  'IQD',
  'ILS',
  'JMD',
  'JPY',
  'JOD',
  'KZT',
  'KES',
  'KWD',
  'KGS',
  'LAK',
  'LBP',
  'LSL',
  'LRD',
  'LYD',
  'MOP',
  'MKD',
  'MGA',
  'MWK',
  'MYR',
  'MVR',
  'MRO',
  'MUR',
  'MXN',
  'MDL',
  'MAD',
  'MZN',
  'MMK',
  'NAD',
  'NPR',
  'ANG',
  'NZD',
  'NIO',
  'NGN',
  'NOK',
  'OMR',
  'PKR',
  'PAB',
  'PGK',
  'PYG ',
  'PHP',
  'PLN',
  'QAR',
  'RON',
  'RUB',
  'RWF',
  'SVC',
  'SAR',
  'RSD',
  'SCR',
  'SLL',
  'SGD',
  'SBD',
  'SOS',
  'ZAR',
  'KRW',
  'VES',
  'LKR',
  'SDG',
  'SRD',
  'SZL',
  'SEK',
  'CHF',
  'TJS',
  'TZS',
  'THB',
  'TOP',
  'TTD',
  'TND',
  'TRY',
  'TMT',
  'UGX',
  'UAH',
  'AED',
  'USD',
  'UYU',
  'UZS',
  'VND',
  'XOF',
  'YER',
  'ZMW',
  'ETH',
  'EUR',
  'LTC',
  'TWD',
  'PEN',
];
export default function settingsPage() {
  const dispatch = useDispatch();
  const settingsData = useSelector((state: any) => state.settingsReducer);

  // Fastmove

  async function updateFastMove() {
    const correctValue = !(await window.electron.store.get('fastmove'));
    setFastMoveStatus(correctValue);
    await window.electron.store.set('fastmove', correctValue);
    dispatch(setFastMove(correctValue));
  }
  const [fastMoveStatus, setFastMoveStatus] = useState(settingsData.fastMove);

  // Pricing - currency
  async function updateCurrency(valueToSet) {
    setCurrency(valueToSet);
    dispatch(setCurrencyValue(valueToSet));
    window.electron.store.set('pricing.currency', valueToSet);
    // Currency price
    await window.electron.ipcRenderer.getCurrencyRate().then((returnValue) => {
      console.log('currencyrate', returnValue);
      dispatch(setCurrencyRate(returnValue[0], returnValue[1]));
    });
  }
  const [currency, setCurrency] = useState(settingsData.currency);

  // Pricing - source
  async function updateSource(valueToSet) {
    setSource(valueToSet);
    dispatch(setSourceValue(valueToSet));
    window.electron.store.set('pricing.source', valueToSet);
  }
  const [source, setSource] = useState(settingsData.source);
  console.log(source);

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div>
        {/* Page title & actions */}
        <div className="border-b border-gray-200 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-medium leading-6 text-gray-900 sm:truncate">
              Settings
            </h1>
          </div>
        </div>

        {/* Content area */}
        <div className="">
          <div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
            <main className="flex-1">
              <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
                <div className="pb-16">
                  <div className="px-4 sm:px-6 md:px-0">
                    <div className="py-6">
                      {/* Description list with inline editing */}
                      <div className="divide-y divide-gray-200">
                        <div className="">
                        <h3 className="text-lg pt-5 leading-6 font-medium text-gray-900">
                                General settings
                              </h3>
                              <p className="max-w-2xl text-sm text-gray-500">
                                Toggles the general application settings
                              </p>
                          <dl className="divide-y divide-gray-200">

                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">

                              <dt className="text-sm font-medium text-gray-900">
                                Fastmove <br />
                                <span className="text-gray-400">
                                  {' '}
                                  Decreases reliability and increases speed.
                                </span>
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="flex items-center ml-4 flex-shrink-0">
                                  <Switch
                                    checked={window.electron.store.get(
                                      'fastmove'
                                    )}
                                    onChange={() => updateFastMove()}
                                    className={classNames(
                                      fastMoveStatus
                                        ? 'bg-indigo-600'
                                        : 'bg-gray-200',
                                      'relative inline-flex mr-3 flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
                                    )}
                                  >
                                    <span
                                      className={classNames(
                                        fastMoveStatus
                                          ? 'translate-x-5'
                                          : 'translate-x-0',
                                        'pointer-events-none relative inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                      )}
                                    >
                                      <span
                                        className={classNames(
                                          fastMoveStatus
                                            ? 'opacity-0 ease-out duration-100'
                                            : 'opacity-100 ease-in duration-200',
                                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                                        )}
                                        aria-hidden="true"
                                      >
                                        <svg
                                          className="h-3 w-3 text-gray-400"
                                          fill="none"
                                          viewBox="0 0 12 12"
                                        >
                                          <path
                                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                          />
                                        </svg>
                                      </span>
                                      <span
                                        className={classNames(
                                          fastMoveStatus
                                            ? 'opacity-100 ease-in duration-200'
                                            : 'opacity-0 ease-out duration-100',
                                          'absolute inset-0 h-full w-full flex items-center justify-center transition-opacity'
                                        )}
                                        aria-hidden="true"
                                      >
                                        <svg
                                          className="h-3 w-3 text-indigo-600"
                                          fill="currentColor"
                                          viewBox="0 0 12 12"
                                        >
                                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                                        </svg>
                                      </span>
                                    </span>
                                  </Switch>
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="mt-10 divide-y divide-gray-200">
                        <div className="space-y-1">
                          <h3 className="text-lg leading-6 font-medium text-gray-900">
                            Pricing
                          </h3>
                          <p className="max-w-2xl text-sm text-gray-500">
                            Set the pricing variables
                          </p>
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-900">
                                Source <br />
                                <span className="text-gray-400">
                                  {' '}
                                  Select your pricing source
                                </span>
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="flex items-center ml-4 flex-shrink-0">
                                  <Listbox
                                    value={source}
                                    onChange={(e) => updateSource(e)}
                                  >
                                    {({ open }) => (
                                      <>
                                        <div className="mt-1 relative">
                                          <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                            <span className="flex items-center">
                                              <img
                                                src={source?.avatar}
                                                alt=""
                                                className="flex-shrink-0 h-6 w-6 rounded-full"
                                              />
                                              <span className="ml-3 block truncate">
                                                {source?.name}
                                              </span>
                                            </span>
                                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                              <SelectorIcon
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                              />
                                            </span>
                                          </Listbox.Button>

                                          <Transition
                                            show={open}
                                            as={Fragment}
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                          >
                                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                              {sources.map((person) => (
                                                <Listbox.Option
                                                  key={person.id}
                                                  className={({ active }) =>
                                                    classNames(
                                                      active
                                                        ? 'text-white bg-indigo-600'
                                                        : 'text-gray-900',
                                                      'cursor-default select-none relative py-2 pl-3 pr-9'
                                                    )
                                                  }
                                                  value={person}
                                                >
                                                  {({ selected, active }) => (
                                                    <>
                                                      <div className="flex items-center">
                                                        <img
                                                          src={person.avatar}
                                                          alt=""
                                                          className="flex-shrink-0 h-6 w-6 rounded-full"
                                                        />
                                                        <span
                                                          className={classNames(
                                                            selected
                                                              ? 'font-semibold'
                                                              : 'font-normal',
                                                            'ml-3 block truncate'
                                                          )}
                                                        >
                                                          {person.name}
                                                        </span>
                                                      </div>

                                                      {selected ? (
                                                        <span
                                                          className={classNames(
                                                            active
                                                              ? 'text-white'
                                                              : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                          )}
                                                        >
                                                          <CheckIcon
                                                            className="h-5 w-5"
                                                            aria-hidden="true"
                                                          />
                                                        </span>
                                                      ) : null}
                                                    </>
                                                  )}
                                                </Listbox.Option>
                                              ))}
                                            </Listbox.Options>
                                          </Transition>
                                        </div>
                                      </>
                                    )}
                                  </Listbox>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-900">
                                Currency <br />
                                <span className="text-gray-400">
                                  {' '}
                                  Prices will be converted into this currency
                                </span>
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow"></span>
                                <span className="flex items-center ml-4 flex-shrink-0">
                                  <div>
                                    <select
                                      id="location"
                                      name="location"
                                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                      value={currency}
                                      onChange={(e) =>
                                        updateCurrency(e.target.value)
                                      }
                                    >
                                      {currencyCode.map((code) => (
                                        <option key={code}>{code}</option>
                                      ))}
                                    </select>
                                  </div>
                                </span>
                              </dd>
                            </div>
                          </dl>
                        </div>

                        {/* Content area
                        <div className="mt-6">
                          <dl className="divide-y divide-gray-200">
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                              <dt className="text-sm font-medium text-gray-500">
                                Language
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">English</span>
                                <span className="ml-4 flex-shrink-0">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5">
                              <dt className="text-sm font-medium text-gray-500">
                                Date format
                              </dt>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <span className="flex-grow">DD-MM-YYYY</span>
                                <span className="ml-4 flex-shrink-0 flex items-start space-x-4">
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Update
                                  </button>
                                  <span
                                    className="text-gray-300"
                                    aria-hidden="true"
                                  >
                                    |
                                  </span>
                                  <button
                                    type="button"
                                    className="bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                                  >
                                    Remove
                                  </button>
                                </span>
                              </dd>
                            </div>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:pt-5"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-gray-500"
                                passive
                              >
                                Automatic timezone
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={automaticTimezoneEnabled}
                                  onChange={setAutomaticTimezoneEnabled}
                                  className={classNames(
                                    automaticTimezoneEnabled
                                      ? 'bg-purple-600'
                                      : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      automaticTimezoneEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                            <Switch.Group
                              as="div"
                              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:border-b sm:border-gray-200"
                            >
                              <Switch.Label
                                as="dt"
                                className="text-sm font-medium text-gray-500"
                                passive
                              >
                                Auto-update applicant data
                              </Switch.Label>
                              <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <Switch
                                  checked={autoUpdateApplicantDataEnabled}
                                  onChange={setAutoUpdateApplicantDataEnabled}
                                  className={classNames(
                                    autoUpdateApplicantDataEnabled
                                      ? 'bg-purple-600'
                                      : 'bg-gray-200',
                                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-auto'
                                  )}
                                >
                                  <span
                                    aria-hidden="true"
                                    className={classNames(
                                      autoUpdateApplicantDataEnabled
                                        ? 'translate-x-5'
                                        : 'translate-x-0',
                                      'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
                                    )}
                                  />
                                </Switch>
                              </dd>
                            </Switch.Group>
                          </dl>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
