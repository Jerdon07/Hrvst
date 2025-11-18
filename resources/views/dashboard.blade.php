<x-layout>
    <x-slot:heading>
        Dashboard
    </x-slot:heading>

    <main>

        <ul> @foreach ($categories as $category)
            <li>
                <h2>{{ $category['name'] }}</h2>
                
            </li>
            @endforeach
        </ul>
    </main>
</x-layout>