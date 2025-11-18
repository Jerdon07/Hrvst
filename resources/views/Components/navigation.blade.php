<div class="min-h-full">
  <nav class="bg-gray-800/50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex items-center">
          <div class="shrink-0">
            <img src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company" class="size-8" />
          </div>
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <x-nav-link href="/" :active="request() -> is('/')"> Dashboard </x-nav-link>
              <x-nav-link href="/farmers" :active="request() -> is('farmers')"> Farmers </x-nav-link>
              <x-nav-link href="/me"  :active="request() -> is('me')"> Me </x-nav-link>
            </div>
          </div>
        </div>
      </div>
    </div>
