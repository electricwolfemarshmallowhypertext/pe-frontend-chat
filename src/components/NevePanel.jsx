"use client";

export default function NevePanel() {
  return (
    <aside className="w-96 bg-white border-0 border-gray-200 p-6 flex-col justify-center items-center right-sidebar hidden md:flex">
      <div className="w-70 h-70 rounded-full flex items-center justify-center">
        <img
          style={{ maxWidth: "100%", height: "100%" }}
          src="https://antiparty.co/wp-content/uploads/2025/08/0neve.png"
          alt="Neve"
        />
      </div>
      <div className="w-70 h-70 rounded-full flex items-center justify-center">
        <p style={{ textAlign: "center", marginTop: "-30px", fontSize: "15px" }}>
          <b>Neve™</b>
          <br />
          AI that treats you like a human.
        </p>
      </div>
    </aside>
  );
}
