"use client";

import AppLayout from "@/components/layout/AppLayout";
import PageContainer from "@/components/layout/PageContainer";

import QuestionHeader from "./QuestionHeader";
import MetadataBar from "./MetadataBar";
import StudioLayout from "./StudioLayout";
import QuestionEditor from "./QuestionEditor";
import QuestionPreview from "./QuestionPreview";
import OptionEditor from "./OptionEditor";

export default function QuestionBuilderStudio() {

  return (

    <AppLayout>

      <PageContainer
        title="Question Builder Studio"
        subtitle="Create bilingual professional exam questions"
      >

        <QuestionHeader />

        <StudioLayout

          header={<></>}

          metadata={<MetadataBar />}

          editor={
            <RichEditor
              label="Question (English)"
              value=""
              onChange={() => {}}
            />
          }

          preview={
            <QuestionPreview
              questionEn=""
              questionHi=""
            />
          }

          options={
            <OptionEditor
              optionsEn={["","","",""]}
              optionsHi={["","","",""]}
              setOptionsEn={()=>{}}
              setOptionsHi={()=>{}}
              setActiveField={()=>{}}
            />
          }

          explanation={
            <div className="bg-white rounded-3xl h-96" />
          }

          validation={
            <div className="bg-white rounded-3xl h-96" />
          }

          images={
            <div className="bg-white rounded-3xl h-56" />
          }

        />

      </PageContainer>

    </AppLayout>

  );

}