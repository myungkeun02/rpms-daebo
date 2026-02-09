'use client';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/cn';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Disclosure key={index}>
          {({ open }) => (
            <div className="rounded-xl bg-white shadow-sm">
              <Disclosure.Button className="flex w-full items-center justify-between px-6 py-4 text-left">
                <span className="font-medium text-gray-900">
                  {item.question}
                </span>
                <ChevronDownIcon
                  className={cn(
                    'h-5 w-5 text-gray-500 transition-transform',
                    open && 'rotate-180'
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-6 pb-4 text-gray-600">
                {item.answer}
              </Disclosure.Panel>
            </div>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
