"use client";

import { useState } from "react";
import { Input } from "../../components/ui/Input";
import { Checkbox } from "../../components/ui/Checkbox";
import { Radio } from "../../components/ui/Radio";
import { Select } from "../../components/ui/Select";
import { AutocompleteSelect } from "../../components/ui/AutocompleteSelect";
import { Accordion, AccordionItem } from "../../components/ui/Accordion";
import { DatePicker } from "../../components/ui/DatePicker";
import {
  DateRange,
  DateRangePicker,
} from "../../components/ui/DateRangePicker";
import {
  DateTimePicker,
  EnhancedDateTimePicker,
  type DateTimeRange,
} from "../../components/ui/DateTimePicker";
import { Modal, ModalBody, ModalFooter } from "../../components/ui/Modal";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../../components/ui/Tabs";
// import {
//   Wizard,
//   WizardHeader,
//   WizardContent,
//   WizardStep,
//   WizardFooter,
// } from "../../components/ui/Wizard";
import {
  Mail,
  Lock,
  Search,
  Users,
  Settings,
  CreditCard,
  // Check,
} from "lucide-react";
import { ToastProvider, useToast } from "@/contexts/ToastContext";
import Button from "@/components/ui/Button";

function ToastDemo() {
  const { addToast } = useToast();

  const showToast = (type: "success" | "danger" | "warning" | "info") => {
    const messages = {
      success: "Operação realizada com sucesso!",
      danger: "Ocorreu um erro inesperado.",
      warning: "Atenção: verifique os dados inseridos.",
      info: "Nova atualização disponível.",
    };

    addToast(messages[type], type);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      <Button onClick={() => showToast("success")} variant="success" fullWidth>
        Success Toast
      </Button>
      <Button onClick={() => showToast("danger")} variant="danger" fullWidth>
        Error Toast
      </Button>
      <Button
        onClick={() => showToast("warning")}
        className="bg-yellow-600 hover:bg-yellow-700"
        fullWidth
      >
        Warning Toast
      </Button>
      <Button onClick={() => showToast("info")} fullWidth>
        Info Toast
      </Button>
    </div>
  );
}

function UIDemo() {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState("option1");
  const [selectValue, setSelectValue] = useState("");
  const [autocompleteValue, setAutocompleteValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [dateTimeValue, setDateTimeValue] = useState<DateTimeRange>({
    date: null,
    startTime: "09:00",
    endTime: "10:00",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  // const [wizardStep, setWizardStep] = useState(0);
  // const [wizardData, setWizardData] = useState({
  //   name: "",
  //   email: "",
  //   company: "",
  // });

  const selectOptions = [
    { value: "option1", label: "Opção 1" },
    { value: "option2", label: "Opção 2" },
    { value: "option3", label: "Opção 3", disabled: true },
    { value: "option4", label: "Opção 4" },
  ];

  const autocompleteOptions = [
    { value: "personal-trainer", label: "Personal Trainer" },
    { value: "nutritionist", label: "Nutricionista" },
    { value: "physiotherapist", label: "Fisioterapeuta" },
    { value: "psychologist", label: "Psicólogo" },
    { value: "massage-therapist", label: "Massoterapeuta" },
    { value: "yoga-instructor", label: "Instrutor de Yoga" },
    { value: "pilates-instructor", label: "Instrutor de Pilates" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 sm:mb-8">
          Trampa AI UI Components
        </h1>

        <div className="space-y-8 sm:space-y-12">
          {/* Buttons */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Buttons
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                <Button>Default</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="success">Success</Button>
                <Button isLoading>Loading</Button>
                <Button size="sm">Small</Button>
                <Button size="lg" className="col-span-2 sm:col-span-1">
                  Large
                </Button>
                <Button fullWidth className="col-span-2 sm:col-span-2">
                  Full Width
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </section>

          {/* Inputs */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Inputs
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-4">
              <Input label="Default Input" placeholder="Type something..." />
              <Input
                label="With Icons"
                placeholder="example@email.com"
                leftIcon={<Mail size={18} />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                leftIcon={<Lock size={18} />}
              />
              <Input
                label="With Error"
                placeholder="Type something..."
                error="This field is required"
              />
              <Input
                label="Search"
                placeholder="Search..."
                leftIcon={<Search size={18} />}
              />
              <Input
                label="Disabled"
                placeholder="You can't edit this"
                disabled
              />
            </div>
          </section>

          {/* Checkboxes & Radios */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Checkboxes & Radios
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-700 mb-2">
                    Checkboxes
                  </h3>
                  <Checkbox
                    label="Default Checkbox"
                    checked={checkboxValue}
                    onChange={(e) => setCheckboxValue(e.target.checked)}
                  />
                  <Checkbox label="Disabled Checkbox" checked={true} disabled />
                  <Checkbox label="With Error" error="This field is required" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-700 mb-2">
                    Radio Buttons
                  </h3>
                  <Radio
                    name="radio-group"
                    value="option1"
                    label="Option 1"
                    checked={radioValue === "option1"}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    name="radio-group"
                    value="option2"
                    label="Option 2"
                    checked={radioValue === "option2"}
                    onChange={(e) => setRadioValue(e.target.value)}
                  />
                  <Radio
                    name="radio-group"
                    value="option3"
                    label="Disabled Option"
                    checked={radioValue === "option3"}
                    onChange={(e) => setRadioValue(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Select & Autocomplete */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Select & Autocomplete
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <Select
                  label="Basic Select"
                  options={selectOptions}
                  value={selectValue}
                  onChange={setSelectValue}
                  placeholder="Select an option"
                />
                <AutocompleteSelect
                  label="Autocomplete Select"
                  options={autocompleteOptions}
                  value={autocompleteValue}
                  onChange={setAutocompleteValue}
                  placeholder="Search professions..."
                />
              </div>
            </div>
          </section>

          {/* Date Pickers */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Date Pickers
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <DatePicker
                  label="Single Date"
                  value={selectedDate ?? undefined}
                  onChange={setSelectedDate}
                  placeholder="Select a date"
                />
                <DateRangePicker
                  label="Date Range"
                  value={dateRange}
                  onChange={(val) => setDateRange(val)}
                  placeholder="Select date range"
                />
              </div>
            </div>
          </section>

          {/* DateTime Picker */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              DateTime Picker
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-slate-700 mb-4">
                    Basic DateTime Picker
                  </h3>
                  <DateTimePicker
                    label="Agendamento"
                    value={dateTimeValue}
                    onChange={setDateTimeValue}
                    minDate={new Date()}
                    defaultDuration={60}
                    required
                  />
                </div>
                <div>
                  <h3 className="font-medium text-slate-700 mb-4">
                    Enhanced with Presets
                  </h3>
                  <EnhancedDateTimePicker
                    label="Consulta Médica"
                    value={dateTimeValue}
                    onChange={setDateTimeValue}
                    minDate={new Date()}
                    minTime="08:00"
                    maxTime="18:00"
                    timeSlotDuration={15}
                    defaultDuration={30}
                    showDurationPresets={true}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Modal */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Modal
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>

              <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Example Modal"
                size="md"
              >
                <ModalBody>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      This is an example modal dialog. You can put any content
                      here, including forms, images, or other components.
                    </p>
                    <Input label="Name" placeholder="Enter your name" />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="Enter your email"
                    />
                    <Checkbox label="I agree to the terms and conditions" />
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    fullWidth
                    className="sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    fullWidth
                    className="sm:w-auto"
                  >
                    Save Changes
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
          </section>

          {/* Toast Notifications */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Toast Notifications
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <ToastDemo />
            </div>
          </section>

          {/* Tabs */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Tabs
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <Tabs
                defaultValue={activeTab}
                value={activeTab}
                onValueChange={setActiveTab}
              >
                <TabsList>
                  <TabsTrigger value="account">
                    <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Account</span>
                    <span className="sm:hidden">Acc</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Settings</span>
                    <span className="sm:hidden">Set</span>
                  </TabsTrigger>
                  <TabsTrigger value="billing">
                    <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Billing</span>
                    <span className="sm:hidden">Bill</span>
                  </TabsTrigger>
                  <TabsTrigger value="disabled" disabled>
                    <span className="hidden sm:inline">Disabled</span>
                    <span className="sm:hidden">Dis</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="account" className="mt-4 sm:mt-6">
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Account Settings
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600">
                      Manage your account information and preferences.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input label="First Name" placeholder="John" />
                      <Input label="Last Name" placeholder="Doe" />
                      <Input
                        label="Email"
                        type="email"
                        placeholder="john@example.com"
                      />
                      <Input label="Phone" placeholder="+1 (555) 123-4567" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-4 sm:mt-6">
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Application Settings
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600">
                      Configure your application preferences.
                    </p>
                    <div className="space-y-4">
                      <Checkbox label="Enable email notifications" />
                      <Checkbox label="Enable push notifications" />
                      <Checkbox label="Enable dark mode" />
                      <Select
                        label="Language"
                        options={[
                          { value: "en", label: "English" },
                          { value: "pt", label: "Português" },
                          { value: "es", label: "Español" },
                        ]}
                        placeholder="Select language"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="billing" className="mt-4 sm:mt-6">
                  <div className="space-y-4">
                    <h3 className="text-base sm:text-lg font-semibold">
                      Billing Information
                    </h3>
                    <p className="text-sm sm:text-base text-slate-600">
                      Manage your billing details and subscription.
                    </p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                        <div>
                          <h4 className="font-medium text-blue-900">
                            Professional Plan
                          </h4>
                          <p className="text-sm text-blue-700">R$ 99/month</p>
                        </div>
                        <Button size="sm" className="w-full sm:w-auto">
                          Upgrade
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </section>

          {/* Wizard */}
          {/* <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Wizard
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <Wizard
                steps={[
                  { id: "basic", title: "Informações Básicas", icon: Users },
                  { id: "contact", title: "Contato", icon: Mail },
                  { id: "company", title: "Empresa", icon: Settings },
                  { id: "review", title: "Revisão", icon: Check },
                ]}
              >
                <WizardHeader>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Configuração da Conta
                  </h3>
                  <p className="text-slate-600">
                    Complete os passos para finalizar sua configuração
                  </p>
                </WizardHeader>

                <WizardContent>
                  <WizardStep stepId="basic">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-800">
                        Informações Básicas
                      </h4>
                      <Input
                        label="Nome Completo"
                        value={wizardData.name}
                        onChange={(e) =>
                          setWizardData({ ...wizardData, name: e.target.value })
                        }
                        placeholder="Digite seu nome completo"
                      />
                      <p className="text-sm text-slate-600">
                        Essas informações serão usadas para personalizar sua
                        experiência.
                      </p>
                    </div>
                  </WizardStep>

                  <WizardStep stepId="contact">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-800">
                        Informações de Contato
                      </h4>
                      <Input
                        label="E-mail"
                        type="email"
                        value={wizardData.email}
                        onChange={(e) =>
                          setWizardData({
                            ...wizardData,
                            email: e.target.value,
                          })
                        }
                        placeholder="seu@email.com"
                        leftIcon={<Mail size={18} />}
                      />
                      <p className="text-sm text-slate-600">
                        Usaremos este e-mail para enviar notificações
                        importantes.
                      </p>
                    </div>
                  </WizardStep>

                  <WizardStep stepId="company">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-800">
                        Informações da Empresa
                      </h4>
                      <Input
                        label="Nome da Empresa"
                        value={wizardData.company}
                        onChange={(e) =>
                          setWizardData({
                            ...wizardData,
                            company: e.target.value,
                          })
                        }
                        placeholder="Nome da sua empresa"
                      />
                      <p className="text-sm text-slate-600">
                        Opcional: Adicione o nome da sua empresa para relatórios
                        personalizados.
                      </p>
                    </div>
                  </WizardStep>

                  <WizardStep stepId="review">
                    <div className="space-y-4">
                      <h4 className="font-medium text-slate-800">
                        Revisão dos Dados
                      </h4>
                      <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                        <div>
                          <span className="text-sm font-medium text-slate-600">
                            Nome:
                          </span>
                          <p className="text-slate-800">
                            {wizardData.name || "Não informado"}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">
                            E-mail:
                          </span>
                          <p className="text-slate-800">
                            {wizardData.email || "Não informado"}
                          </p>
                        </div>
                        <div>
                          <span className="text-sm font-medium text-slate-600">
                            Empresa:
                          </span>
                          <p className="text-slate-800">
                            {wizardData.company || "Não informado"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">
                        Revise suas informações antes de finalizar.
                      </p>
                    </div>
                  </WizardStep>
                </WizardContent>

                <WizardFooter
                  nextDisabled={
                    (wizardStep === 0 && !wizardData.name) ||
                    (wizardStep === 1 && !wizardData.email)
                  }
                  onFinish={() => {
                    alert("Configuração concluída!");
                    setWizardStep(0);
                    setWizardData({ name: "", email: "", company: "" });
                  }}
                />
              </Wizard>
            </div>
          </section> */}

          {/* Accordion */}
          <section>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              Accordion
            </h2>
            <Accordion>
              <AccordionItem title="What is Trampa AI?">
                <p className="text-slate-600">
                  Trampa AI is a powerful platform for managing your business
                  with clarity. It provides tools for financial management,
                  client tracking, and scheduling.
                </p>
              </AccordionItem>
              <AccordionItem title="How much does it cost?" defaultOpen>
                <p className="text-slate-600">
                  Trampa AI offers flexible pricing plans starting at R$49/month
                  for individual professionals. Organizations pay based on the
                  number of clients they manage.
                </p>
              </AccordionItem>
              <AccordionItem title="Is there a free trial?">
                <p className="text-slate-600">
                  Yes, we offer a 14-day free trial for all plans. No credit
                  card required to get started.
                </p>
              </AccordionItem>
              <AccordionItem title="Disabled Item" disabled>
                <p className="text-slate-600">
                  This content is not accessible.
                </p>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Complete Form Example */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Complete Form Example
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    leftIcon={<Mail size={18} />}
                    required
                  />
                </div>

                <AutocompleteSelect
                  label="Professional Type"
                  options={autocompleteOptions}
                  placeholder="Search your profession"
                />

                <DatePicker
                  label="Birth Date"
                  placeholder="Select your birth date"
                  maxDate={new Date()}
                />

                <EnhancedDateTimePicker
                  label="Appointment Schedule"
                  value={dateTimeValue}
                  onChange={setDateTimeValue}
                  minDate={new Date()}
                  required
                />

                <div className="space-y-3">
                  <Checkbox label="I agree to the terms and conditions" />
                  <Checkbox label="I want to receive marketing emails" />
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <Button type="submit" fullWidth className="sm:flex-1">
                    Create Account
                  </Button>
                  <Button variant="outline" fullWidth className="sm:flex-1">
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </section>

          {/* Component Status */}
          <section>
            <h2 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3 sm:mb-4">
              Component Library Status
            </h2>
            <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-emerald-700 mb-3">
                    ✅ Componentes Implementados
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li>• Button (todas as variantes)</li>
                    <li>• Input (com ícones e validação)</li>
                    <li>• Checkbox (estados funcionais)</li>
                    <li>• Radio (grupos funcionais)</li>
                    <li>• Select (dropdown customizado)</li>
                    <li>• AutocompleteSelect (busca em tempo real)</li>
                    <li>• Accordion (animações suaves)</li>
                    <li>• DatePicker (calendário completo)</li>
                    <li>• DateRangePicker (seleção de período)</li>
                    <li>
                      • <strong>DateTimePicker (novo!)</strong>
                    </li>
                    <li>• Modal/Dialog (acessível e responsivo)</li>
                    <li>• Toast/Notification (sistema completo)</li>
                    <li>• Tabs (navegação por abas)</li>
                    <li>• Wizard (fluxo multi-step)</li>
                    <li>
                      •{" "}
                      <strong>Calendar (avançado como Google Calendar)</strong>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-blue-700 mb-3">
                    🆕 Novos Recursos!
                  </h3>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-xs sm:text-sm text-emerald-700 mb-3">
                      <strong>DateTimePicker:</strong>
                    </p>
                    <ul className="space-y-1 text-xs text-emerald-600">
                      <li>• Seleção de data + horários</li>
                      <li>• Validação de horário de término</li>
                      <li>• Cálculo automático de duração</li>
                      <li>• Presets de duração rápida</li>
                      <li>• Resumo visual do agendamento</li>
                      <li>• Totalmente responsivo</li>
                    </ul>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-xs sm:text-sm text-blue-700 mb-3">
                      <strong>Calendar melhorado:</strong>
                    </p>
                    <ul className="space-y-1 text-xs text-blue-600">
                      <li>• Eventos exibidos dentro das datas</li>
                      <li>• Visual similar ao Notion Calendar</li>
                      <li>• Horários e localizações visíveis</li>
                      <li>• Contador de eventos por dia</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default function UILibraryDemo() {
  return (
    <ToastProvider>
      <UIDemo />
    </ToastProvider>
  );
}
