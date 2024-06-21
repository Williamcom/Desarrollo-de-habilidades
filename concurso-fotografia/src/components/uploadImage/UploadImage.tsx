import { ChangeEventHandler, useState, useRef, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Fieldset } from "primereact/fieldset";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  FileUploadSelectEvent,
  FileUploadUploadEvent,
  ItemTemplateOptions,
} from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tooltip } from "primereact/tooltip";
import { Tag } from "primereact/tag";
import { uploadFile, uploadInfo, getData } from "../../firebase/config";

interface SentimentChangeEvent {
  target: HTMLInputElement & { checked: boolean; value: string };
}

const UploadImage: React.FC = () => {
  {
    /* ============== HOOKS ==============*/
  }

  const [author, setAuthor] = useState("");

  const [sentiments, setSentiments] = useState<string[]>([]);

  const onSentimentsChange = (e: SentimentChangeEvent) => {
    let __sentiments: string[] = [...sentiments];
    if (e.target.checked) {
      __sentiments.push(e.target.value);
    } else {
      const index = __sentiments.indexOf(e.target.value);
      if (index > -1) {
        __sentiments.splice(index, 1);
      }
    }
    setSentiments(__sentiments);
  };

  const [description, setDescription] = useState("");

  const toast = useRef<Toast>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload>(null);
  const [file, setFile] = useState(null);

  const showMessage = (message: String, type: String) => {
    if (type == "success") {
      toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: message,
      });
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: message,
      });
    }
  };

  const onTemplateSelect = (e: FileUploadSelectEvent) => {
    let _totalSize = totalSize;
    let files = e.files;
    setFile(e.files[0]);

    for (let i = 0; i < files.length; i++) {
      _totalSize += files[i].size || 0;
    }

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: FileUploadUploadEvent) => {
    let _totalSize = 0;

    e.files.forEach((file) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);

    toast.current?.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file: File, callback: Function) => {
    setFile(null);
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    const { className, chooseButton } = options;
    const value = totalSize / 100000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}

        <div className="flex align-items-center gap-3 ml-auto">
          <span>{formatedValue} / 10 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;

    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger ml-auto"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Arrastra y suelta tu imagen aquí
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  const seeStates = async () => {
    /*Subir imagen a bucket de firebase */
    let result = null;
    try {
      result = await uploadFile(file);
      uploadInfo({ author, sentiments, description, result });
      showMessage("¡Información guardada!", "success");
    } catch (e) {
      console.log(e);
      showMessage("¡Error al subir la imagen!", "warn");
    }

    /* Limpiar todos los estados en logica y en interfaz */
    setAuthor("");
    setDescription("");
    setSentiments([]);
    /* TODO: Limipar input de imagen */
  };

  return (
    <div className="card flex justify-content-center py-1">
      <Fieldset legend="¡Las emociones en ESCOM!" className="w-8 shadow-8">
        <small>
          Contenido exclusivo para el equipo de adquisión de imágenes (Usenlo
          con cuidado)
        </small>
        <div className="flex flex-row pt-4">
          <div>
            {/* ============== InputText Author ==============*/}
            <div className="flex flex-column gap-2 pb-5">
              <label htmlFor="author" className="pb-3">
                Autor
              </label>
              <InputText
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-9"
              />
            </div>
            {/* ============== Checkbox Sentiments ==============*/}
            <div className="pt-2">
              <label htmlFor="checkboxGroup">Emociones</label>
              <div
                className="card flex flex-wrap justify-content-center gap-2 pt-4"
                id="checkboxGroup"
              >
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="sentiment1"
                    name="sentiments"
                    value="Felicidad"
                    onChange={onSentimentsChange}
                    checked={sentiments.includes("Felicidad")}
                  />
                  <label htmlFor="sentiment1" className="ml-2">
                    Felicidad
                  </label>
                </div>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="sentiment2"
                    name="sentiments"
                    value="Tristeza"
                    onChange={onSentimentsChange}
                    checked={sentiments.includes("Tristeza")}
                  />
                  <label htmlFor="sentiment2" className="ml-2">
                    Tristeza
                  </label>
                </div>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="sentiment3"
                    name="sentiments"
                    value="Enojo"
                    onChange={onSentimentsChange}
                    checked={sentiments.includes("Enojo")}
                  />
                  <label htmlFor="sentiment3" className="ml-2">
                    Enojo
                  </label>
                </div>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="sentiment4"
                    name="sentiments"
                    value="Desagrado"
                    onChange={onSentimentsChange}
                    checked={sentiments.includes("Desagrado")}
                  />
                  <label htmlFor="sentiment4" className="ml-2">
                    Desagrado
                  </label>
                </div>
                <div className="flex align-items-center">
                  <Checkbox
                    inputId="sentiment4"
                    name="sentiments"
                    value="Miedo"
                    onChange={onSentimentsChange}
                    checked={sentiments.includes("Miedo")}
                  />
                  <label htmlFor="sentiment4" className="ml-2">
                    Miedo
                  </label>
                </div>
              </div>
            </div>

            {/* ============== InputText Author ==============*/}
            <div className="pt-5 w-full">
              <label htmlFor="descriptionTextArea">Descripcion</label>
              <div
                className="card flex justify-content-left pt-3"
                id="descriptionTextArea"
              >
                <InputTextarea
                  autoResize
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  cols={40}
                />
              </div>
            </div>
          </div>
          <div className="w-full pl-3">
            {/* ============== InputUpload Upload File ==============*/}
            <div className="py-1">
              <div>
                <Toast ref={toast}></Toast>

                <Tooltip
                  target=".custom-choose-btn"
                  content="Choose"
                  position="bottom"
                />
                <Tooltip
                  target=".custom-upload-btn"
                  content="Upload"
                  position="bottom"
                />
                <Tooltip
                  target=".custom-cancel-btn"
                  content="Clear"
                  position="bottom"
                />

                <FileUpload
                  ref={fileUploadRef}
                  name="demo[]"
                  url="/api/upload"
                  accept="image/*"
                  maxFileSize={1000000}
                  onUpload={onTemplateUpload}
                  onSelect={onTemplateSelect}
                  onError={onTemplateClear}
                  onClear={onTemplateClear}
                  headerTemplate={headerTemplate}
                  itemTemplate={itemTemplate}
                  emptyTemplate={emptyTemplate}
                  chooseOptions={chooseOptions}
                  uploadOptions={uploadOptions}
                  cancelOptions={cancelOptions}
                />
              </div>
            </div>
            {/* ============== Button  ==============*/}
            <div className="flex flex-row-reverse flex-wrap py-1">
              <Button
                className="flex align-items-center justify-content-center font-bold border-round m-2"
                label="Enviar"
                severity="help"
                onClick={seeStates}
              />
            </div>
          </div>
        </div>
      </Fieldset>
    </div>
  );
};

export default UploadImage;
