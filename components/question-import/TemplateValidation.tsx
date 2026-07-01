"use client";

interface Props {
  schema: any;
}

export default function TemplateValidation({
  schema,
}: Props) {

  if (!schema) return null;

  return (

    <div className="bg-white rounded-3xl border shadow-sm p-8">

      <h2 className="text-2xl font-black text-tcd-blue">

        Template Validation

      </h2>

      <div className="mt-5">

        <span
          className={
            schema.valid
              ? "text-green-600 font-bold"
              : "text-red-600 font-bold"
          }
        >

          {schema.valid
            ? "Template Valid"
            : "Template Invalid"}

        </span>

      </div>

      {schema.missing.length > 0 && (

        <div className="mt-6">

          <div className="font-bold text-red-600">

            Missing Columns

          </div>

          <ul className="list-disc ml-6 mt-2">

            {schema.missing.map(
              (item: string) => (

                <li key={item}>

                  {item}

                </li>

              )
            )}

          </ul>

        </div>

      )}

      {schema.extra.length > 0 && (

        <div className="mt-6">

          <div className="font-bold text-yellow-600">

            Extra Columns

          </div>

          <ul className="list-disc ml-6 mt-2">

            {schema.extra.map(
              (item: string) => (

                <li key={item}>

                  {item}

                </li>

              )
            )}

          </ul>

        </div>

      )}

    </div>

  );

}