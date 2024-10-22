export default function CardsDashMain() {
    const courses = [
      { id: 1, title: "Terapia Curso - 1", instructor: "Andreia do Couto", time: "5hr", img: "/course 1.png", color: "bg-blue-50" },
      { id: 2, title: "Terapia Curso - 2", instructor: "Andreia do Couto", time: "2hr", img: "/course 2.png", color: "bg-blue-50" },
    ];
  
    return (
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-regular text-ciano">Continue Estudando</h2>
          <a href="#" className="text-ciano text-md">Ver todos</a>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
          {courses.map((course) => (
            <div key={course.id} className={`flex items-center p-4 rounded-lg ${course.color}`}>
              <img src={course.img} alt={`Imagem do ${course.title}`} className="w-[170px] h-[90px] rounded-lg mr-4" />
              <div className="flex flex-col">
                <span className="bg-teal-600 text-white font-semibold text-xs px-2 py-2 rounded-full w-max mb-1">Terapia</span>
                <h3 className="text-gray-800 font-semibold">{course.title}</h3>
                <p className="text-gray-500">{course.instructor}</p>
              </div>
              <div className="ml-auto text-gray-500">{course.time}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  